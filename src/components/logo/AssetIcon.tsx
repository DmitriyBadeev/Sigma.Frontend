import Avatar from "antd/lib/avatar/avatar"
import React from "react"

type propTypes = {
    ticket: string
    size?: "default" | "large" | "small"
}

const AssetIcon: React.FC<propTypes> = (props) => {
    return (
        <Avatar
            src={`https://storage.badeev.info/tickets/${props.ticket}.svg`}
            size={props.size || "small"}
        >
            {props.ticket[0]}
        </Avatar>
    )
}

export default AssetIcon
