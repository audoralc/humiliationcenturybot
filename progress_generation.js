
function calculatePercentage() {
    const inaugurationDay = new Date('2025-01-20');
    const todaysDate = new Date(); 

    const milisecondsSinceInaug = todaysDate - inaugurationDay; 

    const milisecondsPerDay = 1000 * 60 * 60 * 24; 

    const daysSinceInaug = Math.floor(milisecondsSinceInaug / milisecondsPerDay) 

    const dayPercentageOfCentury = 0.0027; 

    const progress = daysSinceInaug * dayPercentageOfCentury;

    return progress; 
}


async function generateProgressBar () {
    const progressPercentage = calculatePercentage() * 100;
    const roundToNearestFive = Math.floor(progressPercentage / 5) * 5;

    const fullBar = '\u{2593}\u{2593}\u{2593}\u{2593}\u{2593}\u{2593}\u{2593}\u{2593}\u{2593}\u{2593}\u{2593}\u{2593}\u{2593}\u{2593}\u{2593}\u{2593}\u{2593}\u{2593}\u{2593}\u{2593}';


    const filledSegments = roundToNearestFive / 5; 
    const unfilledSegments = fullBar.length - filledSegments;
    const padEndBound = fullBar.slice(unfilledSegments - 1);

    let bar; 

    if (padEndBound) {
        bar = padEndBound.padEnd(fullBar.length, '\u{2591}');
    }

    return bar;
} 



export default async function generateProgress() {
    const progressBar = await generateProgressBar();

    const progressPercentage = calculatePercentage() * 100;
    const yearNumber = Math.floor(calculatePercentage()) + 1;
    const roundedProgress = parseFloat(progressPercentage.toFixed(4));

    const label = `${roundedProgress}% of ${yearNumber}% (year ${yearNumber}) `;

    const message = ` ${progressBar} ${label}`; 

    console.log('message', message);

    /* ##### 75% of 1% (year 1) */
    return message; 
}