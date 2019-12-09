const MINIMUM_WEIGHT = 4;  // lbs
const MAXIMUM_WEIGHT = 180;  // lbs
const FEEDING_RECOMMENDATIONS = {
    4: 0.75,
    6: 1.125,
    10: 1.5,
    20: 2.625,
    30: 3.5,
    40: 4.25,
    50: 5,
    60: 5.75,
    70: 6.375,
    80: 7.125,
    90: 7.75,
    100: 8.375,
    110: 8.875,
    120: 9.5,
    130: 10.125,
    140: 10.625,
    150: 11.25,
    160: 11.75,
    170: 12.25,
    180: 12.75
};

function computeCups(weight) {
    if (weight <= MINIMUM_WEIGHT) {
        return FEEDING_RECOMMENDATIONS[MINIMUM_WEIGHT];
    }

    if (weight >= MAXIMUM_WEIGHT) {
        return FEEDING_RECOMMENDATIONS[MAXIMUM_WEIGHT];
    }

    var index = 0;
    while (Object.keys(FEEDING_RECOMMENDATIONS)[index] < weight) {
        ++index;
    }

    var lowWeight = Object.keys(FEEDING_RECOMMENDATIONS)[index - 1];
    var highWeight = Object.keys(FEEDING_RECOMMENDATIONS)[index];
    var lowCups = FEEDING_RECOMMENDATIONS[lowWeight];
    var highCups = FEEDING_RECOMMENDATIONS[highWeight];
    var slope = (highCups - lowCups) / (highWeight - lowWeight);
    return lowCups + slope * (weight - lowWeight);
}

function handleBodyWeightChanges() {
    var weight = document.getElementById('body-weight-input').value;
    var units = document.getElementById('body-weight-units-select').value;
    if (units == 'kg') {
        weight *= 2.20462;
    }

    var cups = computeCups(weight);
    var roundedCups = (Math.round(cups * 4) / 4).toFixed(2);
    var fractionalCups = roundedCups % 1;
    var wholeCups = roundedCups - fractionalCups;

    var displayableRoundedCups = '';
    if (wholeCups != 0) {
        displayableRoundedCups = wholeCups.toString();
    }

    if (fractionalCups == 0.25) {
        displayableRoundedCups += '&frac14;';
    } else if (fractionalCups == 0.5) {
        displayableRoundedCups += '&frac12;';
    } else if (fractionalCups == 0.75) {
        displayableRoundedCups += '&frac34;';
    }

    document.getElementById('recommendation-exact').innerHTML = cups.toFixed(3);
    document.getElementById('recommendation-rounded').innerHTML = displayableRoundedCups;
    return false;
}
