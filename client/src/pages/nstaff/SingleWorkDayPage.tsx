import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getSingleWorkDay, updateWorkDay } from "../../api/nstaff/workDaysApi";
import { singleDayProps } from "./../../types/nstaff";
import { calculateDayEarnings } from "./../../helpers/nstaff";
import { getSingleMonthlyRate } from "../../api/nstaff/monthlyRatesApi";
import { cardTipTax, taxToKitchen } from "../../constants/taxes";
import { hourDiff } from "./../../helpers/hourDiff";
import ResMessages from "../../components/global/ErrorMessage";
import { roundTo2Decimals } from "../globals";
const SingleWorkDayDetailPage = () => {
    const { id } = useParams();
    const [workDay, setWorkDay] = useState<null | singleDayProps>(null);
    const [rate, setRate] = useState(0);
    const [resMsg, setResMsg] = useState<[string] | []>([]);

    useEffect(() => {
        (async () => {
            const res = await getSingleWorkDay(id);
            if (!res) return;
            setWorkDay({ ...res.data.message, date: `${res.data.message.month}-${res.data.message.day}` });

            const res1 = await getSingleMonthlyRate(res.data.message.month);
            if (!res1) return;
            setRate(res1.data.message.rate);
        })();
    }, [id]);

    const updateSingleWorkDay = async () => {
        if (workDay) {
            const res = await updateWorkDay(
                {
                    date: workDay.date,
                    startOfWork: workDay.startOfWork,
                    endOfWork: workDay.endOfWork,
                    tipCash: workDay.tipCash,
                    tipCard: workDay.tipCard,
                    receipts: workDay.receipts,
                },
                workDay._id
            );
            if (!res) return;
            setResMsg(res.data.message);
        }
    };

    return (
        <div>
            {workDay && (
                <div>
                    day: {workDay.day} month: {workDay.month} earnings: {calculateDayEarnings(workDay, rate)} rate: {rate}
                    <div>
                        <div>
                            Date <input min="1900-01-02" type="date" name="date" onChange={(e) => setWorkDay({ ...workDay, date: e.target.value })} value={workDay.date} />
                        </div>
                        <div>
                            <div>
                                Start of work <input type="time" name="startOfWork" onChange={(e) => setWorkDay({ ...workDay, startOfWork: e.target.value })} value={workDay.startOfWork} />
                            </div>
                            <div>
                                End of work <input type="time" name="endOfWork" onChange={(e) => setWorkDay({ ...workDay, endOfWork: e.target.value })} value={workDay.endOfWork} />
                            </div>
                            <div>diff: {hourDiff(workDay.startOfWork, workDay.endOfWork)}</div>
                        </div>
                        <div>
                            Tip(cash):{" "}
                            <input
                                value={workDay.tipCash}
                                min={0}
                                onChange={(e) => {
                                    if (e.target.value !== "") {
                                        setWorkDay({ ...workDay, tipCash: parseFloat(e.target.value) });
                                    }
                                }}
                                type="number"
                            />
                        </div>
                        <div>
                            Tip(card): {workDay.tipCard * cardTipTax} before tax{" "}
                            <input
                                value={workDay.tipCard}
                                min={0}
                                onChange={(e) => {
                                    if (e.target.value !== "") {
                                        setWorkDay({ ...workDay, tipCard: parseFloat(e.target.value) });
                                    }
                                }}
                                type="number"
                            />
                        </div>
                        <div>
                            Receipts:{" "}
                            <input
                                value={workDay.receipts}
                                min={0}
                                type="number"
                                onChange={(e) => {
                                    if (e.target.value !== "") {
                                        setWorkDay({ ...workDay, receipts: parseFloat(e.target.value) });
                                    }
                                }}
                            />{" "}
                            tax to kitchen {roundTo2Decimals(workDay.receipts * taxToKitchen)}
                        </div>
                    </div>
                    <button onClick={updateSingleWorkDay}>submit</button>
                    <ResMessages messages={resMsg} />
                </div>
            )}
        </div>
    );
};

export default SingleWorkDayDetailPage;
