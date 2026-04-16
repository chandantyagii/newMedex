export default function Timeline() {
  const data = [
    { date: "2024-01-10", event: "Blood Test" },
    { date: "2024-02-15", event: "Doctor Visit" },
  ];

  return (
    <div>
      <h3 className="font-semibold mb-2">Medical Timeline</h3>
      <ul>
        {data.map((item, index) => (
          <li key={index} className="border-l-2 pl-3 mb-2">
            <p className="text-sm text-gray-500">{item.date}</p>
            <p>{item.event}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}