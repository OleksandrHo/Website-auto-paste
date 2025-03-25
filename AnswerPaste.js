// ==UserScript==
// @name        Automation script for blackboard.com
// @namespace   Violentmonkey Scripts
// @match       https://uic.blackboard.com/*
// @version     1.5
// @author      Me
// @description 3/25/2025, 11:14:28 AM
// ==/UserScript==

(function() {
    'use strict';

    const answers = ["1e10","2e10","3e10","4e10","5e10","6e10","7e10","8e-2"]


    // Create the button element
    const startButton = document.createElement('button');
    startButton.textContent = 'Start Script';

    // Apply CSS styles to ensure the button is always visible
    startButton.style.position = 'fixed';
    startButton.style.top = '10px';
    startButton.style.right = '10px';
    startButton.style.zIndex = '10000';  // Ensures the button stays on top
    startButton.style.padding = '10px';
    startButton.style.backgroundColor = '#008CBA';
    startButton.style.color = '#fff';
    startButton.style.border = 'none';
    startButton.style.borderRadius = '5px';
    startButton.style.cursor = 'pointer';

    // Append the button to the body of the document
    document.body.appendChild(startButton);

    // Add an event listener to run your code when the button is clicked
    startButton.addEventListener('click', () => {
        // Try to locate the target iframe by its class
        const iframe = document.querySelector('iframe.classic-learn-iframe');
        let answerBoxes, ids;

        if (iframe) {
            // If the iframe is found, work within its document
            const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
            answerBoxes = iframeDoc.querySelectorAll('input[type="text"][id^="num-ans-"]');
            ids = Array.from(answerBoxes).map(input => input.id);
            console.log('IDs in iframe:', ids);

            // Loop through each found element and set a value
            for (let i = 0; i < ids.length; i++) {
                const inputElement = iframeDoc.getElementById(ids[i]);
                if (inputElement) {
                    inputElement.value = `Value ${i}`;
                }
            }
        } else {
            // If no iframe is found, work on the main document
            answerBoxes = document.querySelectorAll('input[type="text"][id^="num-ans-"]');
            ids = Array.from(answerBoxes).map(input => input.id);
            console.log('IDs in main document:', ids);

            // Loop through each found element and set a value
            for (let i = 0; i < ids.length; i++) {
                const inputElement = document.getElementById(ids[i]);
                if (inputElement) {
                    inputElement.value = answers[i];
                }
            }
        }

        console.log('Script Started on Blackboard Outline!');
    });
})();
