//REMEMBER: CHECK THE JS CONSOLE!!!! :D

//TODO (maybe) (thanks peter ward) : 20% opacity sunshine thing behind gabe.
//TODO each click loads more images

$(function() {
    
    console.log("Get your shit together internet!");
    var pageWidth = $('body').width();
    // How many falling boxes we'll have at maximum gabeIntensity.
    //var MAX_SALES = (pageWidth/70)*10;
    var MAX_SALES = 1000000000000; //this is the farthest you can go.

    // We poll these variables while the wallet is being prepared
    var gabeReady = false;
    // also only care about the first time we load the steam iframe, or else we keep adding sales
    // every time we navigate to a new steam link.
    var iframeReady = false;
    var audioReady = false;

    // The carefully, lovingly determined percentages which his holiness removes from the prices of his products.
    var STEAM_SALES = [90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 69, 100] //69 mother fuckers!

    // lolsorandom
    var randomChoice = function(list) {
            return list[Math.floor(Math.random()*list.length)]
    }

    var getRandomInt = function(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    var startRain = function () {
        console.log("ARE YOU READY FOR A MIRACLE?");
        console.log(">>YES WE ARE!");

        // When the image of his holiness loads, show it and animate it.
        var $saleBox = $('.sale-box');
        console.log("His holiness has arrived");
        // How long in ms to wait until adding another sale box.
        var interval = 200;
        var numSales = 0;

        // Adds a sale box at a random x position.
        var addSale = function() {

            var xPos = getRandomInt(0, pageWidth);
            var percentOff = randomChoice(STEAM_SALES);
            // Just copy the hidden box we had at page load time to make a new box.
            var newSale = $saleBox.clone().show();

            newSale.text("-" + percentOff + "%"); // >js >strings

            newSale.css("left", xPos);
            $('body').append(newSale);

            //Only have MAX_SALES sale boxes onscreen at once.
            if (numSales < MAX_SALES) {
                // Add a new sale box later.
                window.setTimeout(addSale, interval);
                numSales++;
            }

        };

        // Set an interval to decrease the interval #inception
        window.setInterval(function() {
            interval = Math.max(10, interval - 10);
        }, 500);

        window.setTimeout(addSale, 2*1000);

    };

    var startGabe = function() {
        $('div.gag').show();
        $('div.gag').addClass('gag-animation');
    }


    var praiseBeToGaben = function () {
        $('div.prepare-gag').hide();
        startGabe();
        startRain();
        $audio.trigger('play');
    }

    //TODO: system requirements for these legit CSS animations
    var $steamFrame = $('iframe.steam')

    $steamFrame.load(function() {
        console.log("The steam train caring His holiness has arrived. ");
        if (iframeReady) {
            return
        }
        iframeReady = true; //programming
    });

    $gabe = $('div.gag > img');
    //Even if we loaded from cache, praise be. Nothing can cache his holiness forever.
    if ($gabe[0].complete) {
        gabeReady = true;
    }
    else {
        $gabe.load(function () {
            gabeReady = true;
        });
    }

    $audio = $('audio');
    $audio.on('loadedmetadata', function() {
        audioReady = true;
    });
    $audio.on('ended', function() {
        this.currentTime = 0;
        this.play();
    });

    var prepareWallet = function() {
        if (gabeReady && iframeReady && audioReady) {
            $('.prepare-loader').css('max-height', $('.prepare-loader > img').height() / 3 + 'px');
            window.setTimeout(praiseBeToGaben, 1000);
            console.log("He is ready");
        } else {
            window.setTimeout(prepareWallet, 100);
            console.log("WALLET WAS NOT READY!");
            console.log("GOD DAM IT AMERICA!");
        }
    }

    prepareWallet();
});



