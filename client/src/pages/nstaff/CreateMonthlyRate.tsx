import { createMonthlyRate } from "../../api/nstaff/monthlyRatesApi";
import { useForm } from "../../hooks/useForm";
import { useState } from "react";
import ResMessages from "../../components/global/ErrorMessage";

const CreateMonthlyRatePage = () => {
    const initialDate = new Date().toISOString().split("T")[0].slice(0, 7);
    const [body, handleChange] = useForm({ month: initialDate, rate: 18.3 });
    const [resMsg, setResMsg] = useState<[string] | []>([]);

    const handleCreateMonthlyRate = async () => {
        const res = await createMonthlyRate(body);
        if (!res) return;
        setResMsg(res.data.message);
    };

    return (
        <div>
            <div>
                month <input min="1900-02" type="month" name="month" value={body.month} onChange={handleChange} />
            </div>
            <div>
                rate <input min="0" type="number" step={0.1} name="rate" value={body.rate} onChange={handleChange} />
            </div>
            <button onClick={handleCreateMonthlyRate}>create</button>
            <ResMessages messages={resMsg} />
        </div>
    );
};
export default CreateMonthlyRatePage;
