import { useState, useEffect } from "react";
import { getAllMonthlyRates } from "../../api/nstaff/monthlyRatesApi";
import SingleMonthlyRate from "../../components/nstaff/SingleMonthlyRate";
import { singleMonthlyRate } from "../../types/nstaff";

const MonthlyRatesPage = () => {
    const [monthlyRates, setMonthlyRates] = useState<singleMonthlyRate[] | []>([]);

    useEffect(() => {
        (async () => {
            const res = await getAllMonthlyRates();
            if (!res) return;
            setMonthlyRates(res.data.message);
        })();
    }, []);
    return (
        <div>
            <div> {monthlyRates.length ? monthlyRates.map((e) => <SingleMonthlyRate key={e._id} month={e.month} rate={e.rate} />) : ""}</div>
        </div>
    );
};
export default MonthlyRatesPage;
