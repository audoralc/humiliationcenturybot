import { Temporal, Intl, toTemporalInstant } from "@js-temporal/polyfill";
Date.prototype.toTemporalInstant = toTemporalInstant;


var floatPlaces = 4;

export function calculatePercentage() {
  // startTime
  const inaugurationDay = Temporal.PlainDate.from("2025-01-20");
  // endTime
  const endOfCentury = Temporal.PlainDate.from("2125-01-20");
  // now
  let todaysDate = Temporal.Now.plainDateISO();

  const totalDuration = endOfCentury.since(inaugurationDay);
  const progressDuration = todaysDate.since(inaugurationDay);

  const totalMils = totalDuration.total({ unit: "milliseconds" });
  const progressMils = progressDuration.total({ unit: "milliseconds" });

  const percentage = (progressMils / totalMils) * 100;

  return percentage.toFixed(floatPlaces);
}

async function generateProgressBar() {
  const progressPercentage = calculatePercentage();
  const roundToNearestFive = Math.floor(progressPercentage / 5) * 5;

  const fullBar =
    "\u{2593}\u{2593}\u{2593}\u{2593}\u{2593}\u{2593}\u{2593}\u{2593}\u{2593}\u{2593}\u{2593}\u{2593}\u{2593}\u{2593}\u{2593}\u{2593}\u{2593}\u{2593}\u{2593}\u{2593}";

  const filledSegments = roundToNearestFive / 5;
  const unfilledSegments = fullBar.length - filledSegments;
  const padEndBound = fullBar.slice(unfilledSegments - 1);

  let bar;

  if (padEndBound) {
    bar = padEndBound.padEnd(fullBar.length, "\u{2591}");
  }

  return bar;
}

export default async function generateProgress() {
  const progressBar = await generateProgressBar();

  const progressPercentage = calculatePercentage();
  const yearNumber = Math.floor(calculatePercentage()) + 1;

  const label = `${progressPercentage}% (year ${yearNumber})`;

  const message = ` ${progressBar} ${label}`;

  /* ##### 75% of 1% (year 1) */
  return message;
}
