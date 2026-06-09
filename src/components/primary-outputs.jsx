import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NumberField } from "@/components/number-field";

// Applied to a copy button for the brief window after a successful copy: the
// icon flips to a check and the button fills indigo as confirmation.
const COPIED_BUTTON_CLASS =
    "border-indigo-600 bg-indigo-600 text-white hover:bg-indigo-600 hover:text-white dark:bg-indigo-600";

// The primary outputs: Position Size and Take Profit, each beside a copy
// button. `onCopy(field, text)` writes the value to the clipboard; `copiedField`
// names whichever button is currently showing its confirmation state.
export const PrimaryOutputs = ({
    positionSize,
    positionSizeText,
    takeProfit,
    takeProfitText,
    copiedField,
    onCopy
}) => (
    <div className="grid grid-cols-2 items-start gap-x-4 gap-y-4">
        <div className="flex items-end gap-2">
            <div className="flex-1">
                <NumberField
                    id="position-size"
                    label="Position Size"
                    value={positionSizeText}
                    onChange={() => {}}
                    readOnly
                    placeholder="—"
                />
            </div>
            <Button
                size="icon"
                variant="outline"
                onClick={() => onCopy("position", positionSizeText)}
                disabled={positionSize == null}
                aria-label="Copy position size"
                className={
                    copiedField === "position" ? COPIED_BUTTON_CLASS : undefined
                }>
                {copiedField === "position" ? <Check /> : <Copy />}
            </Button>
        </div>
        <div className="flex items-end gap-2">
            <div className="flex-1">
                <NumberField
                    id="take-profit"
                    label="Take Profit"
                    value={takeProfitText}
                    onChange={() => {}}
                    prefix="$"
                    readOnly
                    placeholder="—"
                />
            </div>
            <Button
                size="icon"
                variant="outline"
                onClick={() => onCopy("takeProfit", takeProfitText)}
                disabled={takeProfit == null}
                aria-label="Copy take profit"
                className={
                    copiedField === "takeProfit"
                        ? COPIED_BUTTON_CLASS
                        : undefined
                }>
                {copiedField === "takeProfit" ? <Check /> : <Copy />}
            </Button>
        </div>
    </div>
);
