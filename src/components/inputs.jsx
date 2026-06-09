import { NumberField } from "@/components/number-field";

// The input section: three columns filled row-major so the tab chain runs
// across the top row first — Cash Available, Entry, Stop Loss — then the second
// row (Risk, Risk:Reward, Leverage).
export const Inputs = ({
    cashAvailable,
    onCashAvailableChange,
    cashError,
    entry,
    onEntryChange,
    entryError,
    stopLoss,
    onStopLossChange,
    stopLossError,
    risk,
    onRiskChange,
    riskReward,
    onRiskRewardChange,
    riskRewardError,
    leverage,
    onLeverageChange
}) => (
    <div className="grid grid-cols-3 items-start gap-x-4 gap-y-4">
        <NumberField
            id="cash-available"
            label="Cash Available"
            value={cashAvailable}
            onChange={onCashAvailableChange}
            prefix="$"
            decimals
            placeholder="0.00"
            error={cashError}
        />
        <NumberField
            id="entry"
            label="Entry"
            value={entry}
            onChange={onEntryChange}
            prefix="$"
            decimals
            placeholder="0.00"
            error={entryError}
        />
        <NumberField
            id="stop-loss"
            label="Stop Loss"
            value={stopLoss}
            onChange={onStopLossChange}
            prefix="$"
            decimals
            placeholder="0.00"
            error={stopLossError}
        />
        <NumberField
            id="risk"
            label="Risk"
            value={risk}
            onChange={onRiskChange}
            suffix="%"
        />
        <NumberField
            id="risk-reward"
            label="Risk:Reward"
            value={riskReward}
            onChange={onRiskRewardChange}
            decimals
            placeholder="0.00"
            error={riskRewardError}
        />
        <NumberField
            id="leverage"
            label="Leverage"
            value={leverage}
            onChange={onLeverageChange}
            suffix="x"
        />
    </div>
);
