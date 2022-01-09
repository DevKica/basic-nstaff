const ResMessages = (props: { messages: string[] | [] }) => {
    return (
        <div>
            {props.messages.length
                ? props.messages.map((e: string, index) => (
                      <div style={{ fontSize: "14px" }} key={index}>
                          {e}
                      </div>
                  ))
                : ""}
        </div>
    );
};
export default ResMessages;
