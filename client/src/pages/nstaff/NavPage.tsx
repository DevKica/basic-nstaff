import { useEffect } from "react";
import { singleMonthlyRate } from "../../types/nstaff";
import { useState } from "react";
import { Link } from "react-router-dom";
import { getAllMonthlyRates } from "../../api/nstaff/monthlyRatesApi";

const NavPage = () => {
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
            <div>nav</div>
            <div>
                {monthlyRates.length ? (
                    <div>
                        <div>
                            <Link to="/requireActiveUser/nstaff/monthlyRate/create">
                                <button>add monthly rate</button>
                            </Link>
                        </div>
                        <div>
                            <Link to="/requireActiveUser/nstaff/monthlyRate/all">
                                <button>all monthly rates</button>
                            </Link>
                        </div>
                        <div>
                            {monthlyRates.length
                                ? monthlyRates.map((e) => (
                                      <div key={e._id}>
                                          <Link to={`/requireActiveUser/nstaff/monthDetails/${e.month}`}>{e.month}</Link>
                                      </div>
                                  ))
                                : ""}
                        </div>
                    </div>
                ) : (
                    <>
                        no monthly rates, add some!{" "}
                        <Link to="/requireActiveUser/nstaff/monthlyRate/create">
                            <button>add monthly rate</button>
                        </Link>
                    </>
                )}
            </div>
        </div>
    );
};
export default NavPage;
