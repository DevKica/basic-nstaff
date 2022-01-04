export interface propsType {
    month: string;
    rate: Number;
}

const SingleMonthlyRate = (props: propsType) => {
    return (
        <div>
            <div>
                month:{props.month} rate:{props.rate}zł <button>edit</button>
            </div>
        </div>
    );
};

export default SingleMonthlyRate;
