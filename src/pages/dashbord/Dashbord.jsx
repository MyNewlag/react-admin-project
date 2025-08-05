
import ProductTable from './ProductTable';
import SaleChart from './SaleChart';
import Cards from './Cards';



export default function Dashbord() {

  return (
        <div id="dashboard_section" className="dashboard_section main_section">
            <div className="row">
                <Cards/>            
                <ProductTable/>    
                <SaleChart/>
            </div>
        </div>
  )
}
