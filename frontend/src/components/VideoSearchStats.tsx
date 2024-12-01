import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { 
  Search,
  Clock,
  ArrowLeft,
  ChevronRight,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  change: number;
  icon: React.ElementType;
  description: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, change, icon: Icon, description }) => (
  <Card className="flex-shrink-0 w-64 h-64">
    <CardHeader className="flex flex-col items-center space-y-2">
      <Icon className="h-6 w-6 text-gray-500" />
      <CardTitle className="text-sm font-medium text-center">
        {title}
      </CardTitle>
    </CardHeader>
    <CardContent className="flex flex-col items-center justify-between h-44 text-center">
      <div className="flex flex-col items-center">
        <div className="text-4xl font-bold mb-4">{value}</div>
        <p className="text-sm text-gray-500 px-4 line-clamp-2">
          {description}
        </p>
      </div>
      <div className={`text-sm flex items-center gap-1 ${change > 0 ? 'text-green-500' : 'text-red-500'}`}>
        {change > 0 ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
        {Math.abs(change)}% from last period
      </div>
    </CardContent>
  </Card>
);

const searchData = [
  { date: '2024-03-01', searches: 145, completions: 120, avgTime: 25 },
  { date: '2024-03-02', searches: 165, completions: 140, avgTime: 22 },
  { date: '2024-03-03', searches: 135, completions: 115, avgTime: 28 },
  { date: '2024-03-04', searches: 175, completions: 155, avgTime: 20 },
  { date: '2024-03-05', searches: 155, completions: 135, avgTime: 23 },
  { date: '2024-03-06', searches: 180, completions: 160, avgTime: 21 },
  { date: '2024-03-07', searches: 170, completions: 150, avgTime: 24 },
];

const topSearches = [
  { term: "React Tutorial", count: 245, trend: 12 },
  { term: "JavaScript Basics", count: 198, trend: -5 },
  { term: "CSS Grid Guide", count: 156, trend: 8 },
  { term: "TypeScript Tips", count: 134, trend: 15 },
  { term: "Next.js Setup", count: 112, trend: 3 },
];

const VideoSearchStats: React.FC = () => {
  const [timeframe, setTimeframe] = React.useState('week');

  return (
    <div className="container mx-auto p-6 max-w-7xl space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold">Search Analytics</h1>
        </div>
        <Select value={timeframe} onValueChange={setTimeframe}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select timeframe" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="day">Last 24 Hours</SelectItem>
            <SelectItem value="week">Last 7 Days</SelectItem>
            <SelectItem value="month">Last 30 Days</SelectItem>
            <SelectItem value="year">Last Year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Key Metrics */}
      <ScrollArea className="w-full">
        <div className="flex gap-4 pb-4">
          <MetricCard
            title="Average Search Time"
            value="28s"
            change={-12}
            icon={Clock}
            description="Average time users spend searching for content"
          />
          <MetricCard
            title="Total Searches"
            value="1,234"
            change={8}
            icon={Search}
            description="Total number of searches performed"
          />
          <MetricCard
            title="Search Success Rate"
            value="89%"
            change={5}
            icon={ChevronRight}
            description="Percentage of searches that found relevant content"
          />
        </div>
      </ScrollArea>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Search Trends</CardTitle>
            <CardDescription>Number of searches over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={searchData}>
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="searches" stroke="#2563eb" />
                  <Line type="monotone" dataKey="completions" stroke="#16a34a" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Average Search Time</CardTitle>
            <CardDescription>Time spent searching in seconds</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={searchData}>
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="avgTime" fill="#2563eb" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Searches */}
      <Card>
        <CardHeader>
          <CardTitle>Top Searches</CardTitle>
          <CardDescription>Most popular search terms</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topSearches.map((search, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="text-gray-500">{index + 1}</span>
                  <span className="font-medium">{search.term}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-gray-500">{search.count} searches</span>
                  <span className={`flex items-center gap-1 ${search.trend > 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {search.trend > 0 ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
                    {Math.abs(search.trend)}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VideoSearchStats;
