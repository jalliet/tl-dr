import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { 
  Search,
  Clock,
  ChevronRight,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

interface UserProfileProps {
}

interface MetricCardProps {
  title: string;
  value: string | number;
  change: number;
  icon: React.ElementType;
  description: string;
}

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

const mockHistory = [
  {
    title: "Introduction to Machine Learning",
    summary: "Learn the basics of machine learning and how to apply it in real-world scenarios.",
    thumbnail: "https://picsum.photos/200/300",
    date: "Yesterday",
    duration: "10 minutes"
  },
  {
    title: "Advanced JavaScript Concepts",
    summary: "Take your JavaScript skills to the next level with this in-depth tutorial.",
    thumbnail: "https://picsum.photos/200/301",
    date: "2 days ago",
    duration: "25 minutes"
  },
  {
    title: "Data Science Fundamentals",
    summary: "Get started with data science and learn the basics of data analysis and visualization.",
    thumbnail: "https://picsum.photos/200/302",
    date: "3 days ago",
    duration: "30 minutes"
  }
];

const mockSaved = [
  {
    title: "Introduction to Machine Learning",
    summary: "Learn the basics of machine learning and how to apply it in real-world scenarios.",
    thumbnail: "https://picsum.photos/200/300",
    date: "Yesterday",
    category: "Machine Learning"
  },
  {
    title: "Advanced JavaScript Concepts",
    summary: "Take your JavaScript skills to the next level with this in-depth tutorial.",
    thumbnail: "https://picsum.photos/200/301",
    date: "2 days ago",
    category: "JavaScript"
  },
  {
    title: "Data Science Fundamentals",
    summary: "Get started with data science and learn the basics of data analysis and visualization.",
    thumbnail: "https://picsum.photos/200/302",
    date: "3 days ago",
    category: "Data Science"
  }
];

const MetricCard = ({ title, value, change, icon: Icon, description }: MetricCardProps) => {
  return (
    <Card className="flex-shrink-0 w-64 h-64">
      <CardHeader className="flex flex-col items-center space-y-2">
        <Icon className="h-6 w-6 text-gray-500" />
        <CardTitle className="text-sm font-medium text-center">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-between h-44 text-center overflow-hidden">
        <div className="flex flex-col items-center">
          <div className="text-4xl font-bold mb-4">{value}</div>
          <p className="text-sm text-gray-500 px-4 line-clamp-2 overflow-hidden">
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
};

export const UserProfile = () => {
  const [contentType, setContentType] = React.useState('all');
  const [duration, setDuration] = React.useState('any');
  const [timeframe, setTimeframe] = React.useState('week');

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center gap-4 mb-8">
        <Avatar className="h-20 w-20">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-2xl font-bold">John Doe</h1>
          <p className="text-gray-500">john.doe@example.com</p>
        </div>
      </div>

      <Tabs defaultValue="history" className="w-full">
        <TabsList className="w-full justify-center bg-gray-50 p-2 mb-4">
          <TabsTrigger 
            value="history" 
            className="flex-1 data-[state=active]:bg-white data-[state=active]:shadow-none px-8 mx-2"
          >
            History
          </TabsTrigger>
          <TabsTrigger 
            value="saved"
            className="flex-1 data-[state=active]:bg-white data-[state=active]:shadow-none px-8 mx-2"
          >
            Saved
          </TabsTrigger>
          <TabsTrigger 
            value="stats"
            className="flex-1 data-[state=active]:bg-white data-[state=active]:shadow-none px-8 mx-2"
          >
            Statistics
          </TabsTrigger>
          <TabsTrigger 
            value="settings"
            className="flex-1 data-[state=active]:bg-white data-[state=active]:shadow-none px-8 mx-2"
          >
            Settings
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="history">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Search History</CardTitle>
                  <CardDescription>Your recent video searches and summaries</CardDescription>
                </div>
                <Select value={timeframe} onValueChange={setTimeframe}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select timeframe" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="day">Last 24 hours</SelectItem>
                    <SelectItem value="week">Last 7 days</SelectItem>
                    <SelectItem value="month">Last 30 days</SelectItem>
                    <SelectItem value="year">Last year</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockHistory.map((item, index) => (
                  <div key={index} className="flex items-start space-x-4 p-4 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex-shrink-0">
                      <img 
                        src={item.thumbnail} 
                        alt={item.title} 
                        className="w-32 h-20 object-cover rounded-md"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {item.title}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        {item.summary}
                      </p>
                      <div className="flex items-center mt-2 space-x-2">
                        <span className="text-xs text-gray-400">
                          {item.date}
                        </span>
                        <span className="text-xs text-gray-400">•</span>
                        <span className="text-xs text-gray-400">
                          {item.duration}
                        </span>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      View Details
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="saved">
          <Card>
            <CardHeader>
              <CardTitle>Saved Content</CardTitle>
              <CardDescription>Your bookmarked videos and summaries</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {mockSaved.map((item, index) => (
                  <Card key={index} className="overflow-hidden">
                    <div className="relative h-48">
                      <img 
                        src={item.thumbnail} 
                        alt={item.title}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
                        <h3 className="text-white font-medium truncate">{item.title}</h3>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <p className="text-sm text-gray-500 line-clamp-2">{item.summary}</p>
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center space-x-2">
                          <span className="text-xs text-gray-400">{item.date}</span>
                          <span className="text-xs text-gray-400">•</span>
                          <span className="text-xs text-gray-400">{item.category}</span>
                        </div>
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="stats">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">Search Analytics</h2>
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

            <ScrollArea className="w-full overflow-x-auto">
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
        </TabsContent>

        <TabsContent value="settings">
          <Card className="shadow-md border border-gray-200 rounded-md">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Account Settings</CardTitle>
              <CardDescription className="text-lg text-gray-600">
                Manage your account preferences and notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8 p-6">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Profile Information</h3>
                <div className="grid gap-6">
                  <div className="space-y-2">
                    <label className="text-base font-medium">Display Name</label>
                    <Input 
                      defaultValue="John Doe" 
                      className="w-full h-10 text-base"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-base font-medium">Email</label>
                    <Input 
                      defaultValue="john.doe@example.com" 
                      type="email" 
                      className="w-full h-10 text-base"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-base font-medium">Bio</label>
                    <Textarea 
                      placeholder="Tell us about yourself"
                      className="w-full min-h-[100px] text-base"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Appearance</h3>
                <div className="space-y-2">
                  <label className="text-base font-medium">Theme Customization</label>
                  <p className="text-base text-gray-600">Choose your preferred font size</p>
                  <Select defaultValue="medium">
                    <SelectTrigger className="max-w-md h-10">
                      <SelectValue placeholder="Select size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="small">Small</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="large">Large</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Notifications</h3>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-base font-medium">Email Notifications</label>
                    <p className="text-base text-gray-600">Receive updates about your saved content</p>
                    <Select defaultValue="enabled">
                      <SelectTrigger className="h-10">
                        <SelectValue placeholder="Select option" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="enabled">Enabled</SelectItem>
                        <SelectItem value="disabled">Disabled</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-base font-medium">Weekly Digest</label>
                    <p className="text-base text-gray-600">Get a summary of your weekly activity</p>
                    <Select defaultValue="enabled">
                      <SelectTrigger className="h-10">
                        <SelectValue placeholder="Select option" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="enabled">Enabled</SelectItem>
                        <SelectItem value="disabled">Disabled</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="pt-6 space-x-2">
                <Button variant="outline" className="min-w-[100px]">Cancel</Button>
                <Button className="min-w-[100px]">Save Changes</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};