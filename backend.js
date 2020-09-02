function basicComputeBestOption(options, userBudget) {

    let sortedOptions = options.sort((a, b) => b.audiencecount / b.cost - a.audiencecount / a.cost);
    let remainingBudget = parseInt(userBudget);
    let audienceReached = 0;
    const bestOptions = [];

    for (const option of sortedOptions) {
        const cost = Math.min(remainingBudget, option.cost);
        const ratio = option.audiencecount / option.cost;
        remainingBudget -= cost;
        let audienceKeepTrack = ratio * cost;
        audienceReached += audienceKeepTrack;
        bestOptions.push({ optionId: parseInt(option.optionid), amount: cost, audienceReached: audienceKeepTrack });
        if (remainingBudget === 0) break;
    }

    return { 'result': bestOptions };
}

function advancedComputeBestOption(options, userBudget) {
    let resultArray = [];
    let budget = parseInt(userBudget);
    let n = options.length;
    let optionCost = options.map(options => options.cost);
    let audienceReached = options.map(options => options.audiencecount);

    let K = [];

    for (let objStart = 0; objStart <= n; objStart++) {
        let innerK = [];

        for (let w = 0; w <= budget; w++) {
            innerK.push(0)
        }
        K.push(innerK);
    }

    for (let objStart = 0; objStart <= n; objStart++) {
        for (let w = 0; w <= budget; w++) {
            if (objStart == 0 || w == 0) {
                K[objStart][w] = 0;
            }
            else if (optionCost[objStart - 1] <= w) {
                K[objStart][w] = Math.max(audienceReached[objStart - 1] + K[objStart - 1][w - optionCost[objStart - 1]], K[objStart - 1][w]);
            }
            else {
                K[objStart][w] = K[objStart - 1][w];
            }
        }
    }

    let bestCombi = K[n][budget];

    console.log("Best Result", bestCombi);

    let totalWeight = budget;

    for (let i = n; i >= 0; i--) {
        if (bestCombi <= 0) {
            break;
        }

        if (bestCombi == K[i - 1][totalWeight]) {
            continue;
        }
        else {
            resultArray.push({ optionId: parseInt(options[i - 1].optionid), amount: options[i - 1].cost, audienceReached: options[i - 1].audiencecount });
            bestCombi -= audienceReached[i - 1];
            totalWeight -= optionCost[i - 1];
        }
    }

    return { 'result': resultArray };
}

module.exports = {
    basicComputeBestOption,
    advancedComputeBestOption
}