import { GoogleSearch } from "../cmps/GoogleSearch.jsx";
import { InfoBookEdit } from "../cmps/InfoBookEdit.jsx";


export function BookEdit() {
    return (
        <section>
            <h4>Edit book:</h4>
            <GoogleSearch/>
            <InfoBookEdit/>
        </section>
    )
}