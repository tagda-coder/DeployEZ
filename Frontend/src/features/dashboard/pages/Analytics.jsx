const Analytics = () => {
  return (
    <div className="flex flex-col gap-6 w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mt-8 flex flex-col relative z-10 w-full">
        <h1 className="text-2xl font-semibold mb-4 text-(--text-primary)">Analytics Overview</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { label: "Total Requests", value: "124,592", trend: "+12.5%" },
            { label: "Avg Response Time", value: "142ms", trend: "-4.2%" },
            { label: "Error Rate", value: "0.12%", trend: "-0.05%" }
          ].map((stat, i) => (
            <div key={i} className="bg-(--card-bg) border border-(--card-border) p-6 rounded-xl flex flex-col gap-2 shadow-sm hover:shadow-md transition-shadow duration-300">
              <span className="text-sm text-(--text-muted)">{stat.label}</span>
              <div className="flex items-end gap-3">
                <span className="text-3xl font-bold text-(--text-primary)">{stat.value}</span>
                <span className={`text-sm mb-1 ${stat.trend.startsWith('+') ? 'text-(--status-success)' : 'text-(--status-success)'}`}>
                  {stat.trend}
                </span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-8 bg-(--card-bg) border border-(--card-border) rounded-xl p-6 h-96 flex items-center justify-center shadow-sm">
          <p className="text-(--text-muted)">Chart Placeholder</p>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
