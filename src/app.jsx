import { useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";
import { Inputs } from "@/components/inputs";
import { SecondaryOutputs } from "@/components/secondary-outputs";
import { PrimaryOutputs } from "@/components/primary-outputs";
import { EMPTY_RESULT, evaluate } from "@/lib/position-size";

const App = () => {
    const [cashAvailable, setCashAvailable] = useState("");
    const [risk, setRisk] = useState("10");
    const [leverage, setLeverage] = useState("1");
    const [entry, setEntry] = useState("");
    const [stopLoss, setStopLoss] = useState("");
    const [riskReward, setRiskReward] = useState("2.00");
    const [copiedField, setCopiedField] = useState(null);

    // All input-derived feedback — validation messages, the computed outputs,
    // and (via each output) the copy buttons' enabled state — comes from a
    // single settled snapshot, recomputed 300ms after the last edit. One clock
    // keeps every reaction in sync and avoids flashing transient errors
    // mid-typing.
    const [result, setResult] = useState(EMPTY_RESULT);
    const {
        cashError,
        entryError,
        stopLossError,
        riskRewardError,
        positionSize,
        actualRisk,
        actualCashRisk,
        takeProfit
    } = result;

    useEffect(() => {
        const handle = setTimeout(() => {
            setResult(
                evaluate({
                    cashAvailable,
                    risk,
                    leverage,
                    entry,
                    stopLoss,
                    riskReward
                })
            );
        }, 300);

        return () => clearTimeout(handle);
    }, [cashAvailable, risk, leverage, entry, stopLoss, riskReward]);

    // Copy a computed output to the clipboard, briefly flipping that button's
    // icon to a check (and its fill to indigo) as confirmation.
    const handleCopy = async (field, text) => {
        if (!text) {
            return;
        }
        await navigator.clipboard.writeText(text);
        setCopiedField(field);
        setTimeout(() => setCopiedField(null), 1500);
    };

    const positionSizeText = positionSize == null ? "" : String(positionSize);
    const takeProfitText = takeProfit == null ? "" : takeProfit.toFixed(2);

    return (
        <div className="mx-auto max-w-xl p-8">
            <h2 className="mb-6 text-lg font-semibold">Position Calculator</h2>

            <Inputs
                cashAvailable={cashAvailable}
                onCashAvailableChange={setCashAvailable}
                cashError={cashError}
                entry={entry}
                onEntryChange={setEntry}
                entryError={entryError}
                stopLoss={stopLoss}
                onStopLossChange={setStopLoss}
                stopLossError={stopLossError}
                risk={risk}
                onRiskChange={setRisk}
                riskReward={riskReward}
                onRiskRewardChange={setRiskReward}
                riskRewardError={riskRewardError}
                leverage={leverage}
                onLeverageChange={setLeverage}
            />

            <Separator className="my-6" />

            <SecondaryOutputs
                actualRisk={actualRisk}
                actualCashRisk={actualCashRisk}
            />

            <Separator className="my-6" />

            <PrimaryOutputs
                positionSize={positionSize}
                positionSizeText={positionSizeText}
                takeProfit={takeProfit}
                takeProfitText={takeProfitText}
                copiedField={copiedField}
                onCopy={handleCopy}
            />
        </div>
    );
};

export default App;
