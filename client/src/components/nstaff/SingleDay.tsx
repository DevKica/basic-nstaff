import { cardTipTax, taxToKitchen } from "../../constants/taxes";
import { hourDiff } from "../../helpers/hourDiff";

const SingleDay = (props: any) => {
    const { day, startOfWork, endOfWork, tipCard, tipCash, receipts } = props.workDay;
    const rate = props.rate;

    const hours = hourDiff(startOfWork, endOfWork);
    const tipCardTax = Math.round(tipCard * cardTipTax * 100) / 100;

    return (
        <div>
            <h3>day {day}</h3>
            <div>
                <div>
                    hours: {startOfWork}-{endOfWork} diff: {hours}h
                </div>
                <div>Tip(cash): {tipCash}</div>
                <div>
                    Tip(card): {tipCardTax} before tax {tipCard}
                </div>
                <div>
                    Receipts: {receipts} tax to kitchen {receipts * taxToKitchen}
                </div>
                <div>total: {rate * hours + tipCardTax + tipCash - receipts * taxToKitchen}</div>
            </div>
            <button>details</button>
        </div>
    );
};

export default SingleDay;
