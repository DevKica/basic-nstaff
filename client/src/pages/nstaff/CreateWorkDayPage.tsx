import { useState } from "react";
import { createWorkDay } from "../../api/nstaff/workDaysApi";
import ResMessages from "../../components/global/ErrorMessage";
import { useForm } from "../../hooks/useForm";

const CreateWorkDayPage = () => {
    const initialDate = new Date().toISOString().split("T")[0];
    const [resMsg, setResMsg] = useState<[string] | []>([]);
    const [body, handleChangeBody] = useForm({ date: initialDate, startOfWork: "15:00", endOfWork: "22:30", tipCash: "10", tipCard: "10", receipts: "10" });

    const addDayHandler = async () => {
        const res = await createWorkDay(body);
        if (!res) return;
        setResMsg(res.data.message);
    };

    return (
        <div>
            <div>Add day page</div>
            <div>
                Date <input min="1900-01-02" type="date" name="date" onChange={handleChangeBody} value={body.date} />
            </div>
            <div>
                Start of work <input type="time" name="startOfWork" onChange={handleChangeBody} value={body.startOfWork} />
            </div>
            <div>
                End of work <input type="time" name="endOfWork" onChange={handleChangeBody} value={body.endOfWork} />
            </div>
            <div>
                Tip(cash) <input type="number" min={0} name="tipCash" onChange={handleChangeBody} value={body.tipCash} />
            </div>
            <div>
                Tip(card) <input type="number" min={0} name="tipCard" onChange={handleChangeBody} value={body.tipCard} />
            </div>
            <div>
                Receipts <input type="number" min={0} name="receipts" onChange={handleChangeBody} value={body.receipts} />
            </div>
            <button onClick={addDayHandler}>create</button>
            <ResMessages messages={resMsg} />
        </div>
    );
};
export default CreateWorkDayPage;
