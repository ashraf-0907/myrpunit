import { ResponsiveContainer, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Legend, Tooltip } from 'recharts';

function RadarCharts(params) {
    const { param, option } = params;
    const student1Marks = param.result1.marks;
    const student2Marks = param.result2.marks;
    const mark = option === 's' ? 'sessional' : option === 'e' ? 'final' : 'total';

    const radarData1 = student1Marks.map(item => ({ subject: item.course, [mark]: item[mark] }));
    const radarData2 = student2Marks.map(item => ({ subject: item.course, [mark]: item[mark] }));

    return (
        <ResponsiveContainer width="100%" aspect={2.1}>
            <RadarChart data={radarData1} style={{ backgroundColor: '#fff' }}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis angle={30} domain={[0, 100]} />
                <Tooltip />
                <Legend />
                <Radar name={param.result1.name} dataKey={mark} stroke="goldenrod" fill="goldenrod" fillOpacity={0.6} />
                <Radar name={param.result2.name} data={radarData2} dataKey={mark} stroke="crimson" fill="crimson" fillOpacity={0.6} />
            </RadarChart>
        </ResponsiveContainer>
    );
}

export default RadarCharts;

