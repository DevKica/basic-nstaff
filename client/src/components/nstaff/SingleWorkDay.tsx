import { Link } from "react-router-dom";
import { deleteWorkDay } from "../../api/nstaff/workDaysApi";
import { cardTipTax, taxToKitchen } from "../../constants/taxes";
import { hourDiff } from "../../helpers/hourDiff";
import { calculateDayEarnings } from "../../helpers/nstaff";

const SingleWorkDay = (props: any) => {
    const { _id, day, startOfWork, endOfWork, tipCard, tipCash, receipts } = props.workDay;
    const rate = props.rate;

    const hours = hourDiff(startOfWork, endOfWork);
    const tipCardTax = Math.round(tipCard * cardTipTax * 100) / 100;

    const handleDeleteWorkDay = async () => {
        const res = await deleteWorkDay(_id);
        if (!res) return;
        window.location.reload();
    };

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
                <div>total: {calculateDayEarnings(props.workDay, rate)}</div>
            </div>
            <Link to={`/requireActiveUser/nstaff/singleWorkDay/${_id}`}>
                <button>details</button>
            </Link>{" "}
            <button onClick={handleDeleteWorkDay}>delete</button>
        </div>
    );
};

export default SingleWorkDay;
