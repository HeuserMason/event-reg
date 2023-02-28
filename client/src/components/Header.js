import { Link, useLocation } from "react-router-dom";
import { Layout, Menu } from 'antd';

function Header() {

    const routes = [

        { path: "/", label: "Home" },
        { path: "/events", label: "Events"}
    ];  

    const GetHeaderLinks = () => {

        return routes.map((ele, index) => {

            //const key = index + 1;
            return {
                key: ele.path,
                label: (<Link to={ele.path}>{ele.label}</Link>)
            }
        })
    };

    return (

        <Layout>
            <div className="logo" />
            <Menu
                className="header"
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={['1']}
                selectedKeys={useLocation().pathname}
                items={GetHeaderLinks()}
            />
        </Layout>
    );
}

export default Header;