import Header from "../admin/admin_panel/Header";
import LeftMenu from "../admin/admin_panel/LeftMenu";

import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import "highcharts/highcharts-3d";

export default function AdminDashboard() {

    const columnOptions = {
        chart: {
            type: "column",
            options3d: {
                enabled: true,
                alpha: 15,
                beta: 20,
                depth: 60,
            }
        },
        title: { text: "Department Performance" },
        xAxis: {
            categories: ["CSE", "IT", "ECE", "EEE", "MECH"]
        },
        yAxis: {
            title: { text: "Marks %" }
        },
        plotOptions: {
            column: {
                depth: 30,
                colorByPoint: true
            }
        },
        series: [{
            name: "2026",
            data: [
                { y: 85, color: "#ff6b6b" },
                { y: 78, color: "#4ecdc4" },
                { y: 92, color: "#ffe66d" },
                { y: 74, color: "#1a73e8" },
                { y: 88, color: "#6c5ce7" }
            ]
        }]
    };

    const pieOptions = {
        chart: {
            type: "pie",
            options3d: {
                enabled: true,
                alpha: 45
            }
        },
        title: { text: "Student Distribution" },
        plotOptions: {
            pie: {
                innerSize: 80,
                depth: 45
            }
        },
        series: [{
            name: "Students",
            data: [
                ["CSE", 40],
                ["IT", 20],
                ["ECE", 15],
                ["EEE", 10],
                ["MECH", 15]
            ]
        }]
    };

    return (
        <>
            <Header />

            <div style={{ display: "flex" }}>
                <LeftMenu />
                <div style={{ marginTop: "60px", marginLeft: "-16px", padding: "20px", width: "100%", background: "linear-gradient(to bottom, #fffbfb, #f5f7fa)"}}>
                    <h2 style={{ color: "#fff", marginBottom: "20px" }}>
                        Admin Dashboard
                    </h2>

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "20px", marginBottom: "20px"}}>
                        {["Students", "Staff", "Courses", "Revenue"].map((item, i) => (
                            <div key={i} style={{ background: "#fff", padding: "20px", borderRadius: "12px", boxShadow: "0 4px 10px rgba(0,0,0,0.2)", textAlign: "center"}}>
                                <h3>{item}</h3>
                                <p style={{ fontSize: "22px", fontWeight: "bold" }}>
                                    {Math.floor(Math.random() * 1000)}
                                </p>
                            </div>
                        ))}
                    </div>

                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
                            gap: "20px"
                        }}
                    >
                        <div style={cardStyle}>
                            <HighchartsReact
                                highcharts={Highcharts}
                                options={columnOptions}
                                containerProps={{ style: { height: "350px" } }}
                            />
                        </div>

                        <div style={cardStyle}>
                            <HighchartsReact
                                highcharts={Highcharts}
                                options={pieOptions}
                                containerProps={{ style: { height: "350px" } }}
                            />
                        </div>
                    </div>

                    
                </div>
            </div>
        </>
    );
}

const cardStyle = {
    background: "#fff",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.2)"
};