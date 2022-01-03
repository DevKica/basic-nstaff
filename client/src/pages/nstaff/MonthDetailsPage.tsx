import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getSingleMonthlyRate } from "../../api/nstaff/monthlyRatesApi";
import { getAllWorkDays } from "../../api/nstaff/workDaysApi";
import SingleWorkDay from "../../components/nstaff/SingleWorkDay";
import { calculateEarningsType, singleDayProps } from "../../types/nstaff";
import { calculateDayEarnings } from "./../../helpers/nstaff";

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

            res.data.message.forEach((e: calculateEarningsType) => {
                setEarnings((prevState) => prevState + calculateDayEarnings(e, res1.data.message.rate));
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
                          return <SingleWorkDay key={e._id} workDay={e} rate={rate} />;
                      })
                    : "no days"}
            </div>
        </div>
    );
};

export default MonthlyDetailsPage;
