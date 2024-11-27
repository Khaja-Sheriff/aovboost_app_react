import Header from "../components/Header";
import OfferListTable from "../components/OfferListTable";

export default function Dashboard(){
    return(<>
        <Header />
        <div className="box_sty1">
            <h2 className="d-flex justify-content-center">Dashboard</h2>
            <OfferListTable />
        </div>
    </>);
}