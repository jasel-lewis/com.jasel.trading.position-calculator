import { NumberField } from "@/components/number-field";

// The secondary, informational read-outs (Actual Risk / Actual Cash Risk).
// Excluded from the tab chain (tabIndex -1) — they inform but aren't the
// application's main result. The mr-9 gutter (size-7 button + gap-2) keeps
// their width matching the copy-button fields in the primary outputs below.
export const SecondaryOutputs = ({ actualRisk, actualCashRisk }) => (
    <div className="grid grid-cols-2 items-start gap-x-4 gap-y-4">
        <div className="mr-9">
            <NumberField
                id="actual-risk"
                label="Actual Risk"
                value={actualRisk == null ? "" : String(actualRisk)}
                onChange={() => {}}
                suffix="%"
                readOnly
                tabIndex={-1}
                placeholder="—"
            />
        </div>
        <div className="mr-9">
            <NumberField
                id="actual-cash-risk"
                label="Actual Cash Risk"
                value={actualCashRisk == null ? "" : actualCashRisk.toFixed(2)}
                onChange={() => {}}
                prefix="$"
                readOnly
                tabIndex={-1}
                placeholder="—"
            />
        </div>
    </div>
);
