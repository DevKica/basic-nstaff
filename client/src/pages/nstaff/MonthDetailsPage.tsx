import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getSingleMonthlyRate } from "../../api/nstaff/monthlyRatesApi";
import { getAllWorkDays } from "../../api/nstaff/workDaysApi";
import SingleDay from "../../components/nstaff/SingleDay";
import { cardTipTax, taxToKitchen } from "../../constants/taxes";
import { singleDayProps } from "../../types/nstaff";
import { hourDiff } from "./../../helpers/hourDiff";

const MonthlyDetailsPage = () => {
    const { month } = useParams();
    const [days, setDays] = useState<singleDayProps[]>([]);
    const [rate, setRate] = useState(0);
    const [earnings, setEarnings] = useState(0);

    useEffect(() => {
        (async () => {
            const res1 = await getSingleMonthlyRate(month);
            if (!res1) return;
            setRate(res1.data.message.rate);

            const res = await getAllWorkDays(month);
            if (!res) return;
            setDays(res.data.message);

            res.data.message.forEach((e: singleDayProps) => {
                console.log(e);
                setEarnings((prevState) => prevState + (res1.data.message.rate * hourDiff(e.startOfWork, e.endOfWork) + e.tipCard * cardTipTax + e.tipCash - e.receipts * taxToKitchen));
            });
        })();
    }, [month]);

    return (
        <div>
            <div>
                month: {month} earnings: {earnings} rate: {rate}
            </div>
            <Link to="/requireActiveUser/nstaff/workDays/create">
                <button>create day</button>
            </Link>
            <div>
                {days.length
                    ? days.map((e) => {
                          return <SingleDay key={e._id} workDay={e} rate={rate} />;
                      })
                    : "no days"}
            </div>
        </div>
    );
};

export default MonthlyDetailsPage;
