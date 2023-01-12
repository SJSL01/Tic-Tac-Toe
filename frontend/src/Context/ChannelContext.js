import { useContext } from "react";
import { useState, createContext } from "react";
import { useNavigate } from "react-router-dom";
import { Auth } from "./AuthContext";

const ChannelContext = createContext()

export const ChannelContextProvider = ({ children }) => {

    const useAuth = Auth()

    const [opponent, setOpponent] = useState(null)

    const [channel, setChannel] = useState(null)

    const navigate = useNavigate()

    const createChannel = async () => {


        if (!opponent) {
            return alert("no value")
        }
        if (opponent === useAuth.client.user.name) {
            return alert("not allowed")
        }

        try {
            const res = await useAuth.client.queryUsers({ name: { $eq: opponent } })
            console.log(res);
            if (!res.users.length) {
                return alert("No user with this name")
            }
            if (!res.users[0].online) {
                return alert(`${res.users[0].name} is Offline`)
            }

            // console.log(useAuth.client.user.id, res.users[0].id);
            const newChannel = useAuth.client.channel("messaging", {
                members: [useAuth.client.user.id, res.users[0].id]
            })

            await newChannel.create();
            await newChannel.watch();

            setChannel(newChannel)
            
            console.log(channel);
            

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <ChannelContext.Provider value={{ setOpponent, opponent, channel, createChannel }}>
            {children}
        </ChannelContext.Provider>
    )
}

export const Channel = () => {
    return useContext(ChannelContext)
}

export default ChannelContext;