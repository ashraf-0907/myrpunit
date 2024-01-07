import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Legend , Tooltip } from 'recharts';

function LineCharts(params) {
    const { param, option } = params;
    const student1Marks = param.result1.marks;
    const student2Marks = param.result2.marks;
    const mark = option === 's' ? 'sessional' : option === 'e' ? 'final' : 'total';

    return (
        <ResponsiveContainer width="100%" aspect={3}>
            <LineChart data={student1Marks} style={{ backgroundColor: '#fff' }}>
                <CartesianGrid strokeDasharray="1 1"/>
                <XAxis dataKey="course" interval={'preserveStartEnd'}/>
                <YAxis type="number" domain={[0, 100]} tickCount={6}/>
                <Legend/>
                <Tooltip />
                <Line dataKey={mark} name={param.result1.name} stroke="blue"/>
                <Line dataKey={mark} data={student2Marks} name={param.result2.name} stroke="red"/>
            </LineChart>
        </ResponsiveContainer>
    );
}

export default LineCharts;


