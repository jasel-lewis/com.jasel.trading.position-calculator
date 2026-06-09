// Parse a raw input string into a non-negative number, or null when it is
// empty / not a valid number. Negatives are already blocked at input time,
// but we guard here too so the calculation never runs on bad data.
const parseNum = (raw) => {
    if (raw === "" || raw == null) {
        return null;
    }
    const n = Number(raw);
    return Number.isFinite(n) && n >= 0 ? n : null;
};

// The empty/initial settled state: no errors, no result.
export const EMPTY_RESULT = {
    cashError: null,
    entryError: null,
    stopLossError: null,
    riskRewardError: null,
    positionSize: null,
    actualRisk: null,
    actualCashRisk: null,
    takeProfit: null
};

// Evaluate a full set of raw inputs into a single settled snapshot: the
// validation messages plus the computed outputs (position size, the effective
// risk percentage, the cash actually at risk, and the take-profit distance).
// Each output is computed from just the inputs its formula needs, so the risk
// read-outs can settle before entry/stop loss are filled in; positionSize
// needs the full set and stays null otherwise, doubling as the "can copy"
// signal. Pure function — all feedback in the UI derives from one call here,
// keeping validation and the calculation perfectly in sync.
export const evaluate = ({
    cashAvailable,
    risk,
    leverage,
    entry,
    stopLoss,
    riskReward
}) => {
    const cash = parseNum(cashAvailable);
    const r = parseNum(risk);
    const lev = parseNum(leverage);
    const e = parseNum(entry);
    const sl = parseNum(stopLoss);
    const rr = parseNum(riskReward);

    const cashError =
        cash != null && cash <= 0
            ? "Cash available must be greater than $0.00."
            : null;

    // Cross-field check, only once both entry and stop loss are valid numbers.
    const crossInvalid = e != null && sl != null && e <= sl;
    const entryError = crossInvalid
        ? "Entry must be greater than stop loss."
        : null;
    const stopLossError = crossInvalid
        ? "Stop loss must be less than entry."
        : null;

    const riskRewardError =
        rr != null && rr <= 0
            ? "Risk:Reward must be greater than zero."
            : null;

    const valid =
        cash != null &&
        cash > 0 &&
        r != null &&
        lev != null &&
        e != null &&
        sl != null &&
        e > sl;

    const positionSize = valid
        ? Math.floor((cash * lev * (r / 100)) / (e - sl))
        : null;

    // Effective risk once leverage is applied: the nominal risk percentage
    // scaled by leverage, and the same expressed as a cash amount. Each settles
    // as soon as the inputs in its own formula are valid, independent of the
    // full position-size validity above.
    const actualRisk = r != null && lev != null ? lev * r : null;
    const actualCashRisk =
        cash != null && cash > 0 && r != null && lev != null
            ? lev * cash * (r / 100)
            : null;

    // Take-profit price: the entry plus the per-unit risk (entry − stop loss)
    // scaled by the desired risk:reward ratio. Needs a valid entry above the
    // stop loss and a positive ratio.
    const takeProfit =
        e != null && sl != null && e > sl && rr != null && rr > 0
            ? e + (e - sl) * rr
            : null;

    return {
        cashError,
        entryError,
        stopLossError,
        riskRewardError,
        positionSize,
        actualRisk,
        actualCashRisk,
        takeProfit
    };
};
