import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface QueryNode {
  query: string;
  status: 'completed' | 'in-progress' | 'pending';
  discoveries?: number;
  quality?: 'high' | 'medium' | 'low';
}

interface Agent {
  id: string;
  name: string;
  status: 'exploring' | 'analyzing' | 'idle';
  queryChain: QueryNode[];
}

export function AgentDetail() {
  const agents: Agent[] = [
    {
      id: '1',
      name: 'Exploration Agent',
      status: 'exploring',
      queryChain: [
        { query: 'machine learning basics', status: 'completed', discoveries: 3, quality: 'high' },
        { query: 'neural networks tutorial', status: 'completed', discoveries: 2, quality: 'medium' },
        { query: 'deep learning applications', status: 'in-progress', discoveries: 1 },
        { query: 'AI model training', status: 'pending' },
      ],
    },
  ];

  return (
    <div className="space-y-6">      
      {agents.map((agent) => (
          <div className="relative overflow-x-auto">
            <div className="flex items-center gap-2 min-w-max">
              {agent.queryChain.map((node, index) => (
                <Card key={index} 
                  className={`p-2 min-w-[150px] ${
                    node.status === 'pending' ? 'opacity-50' : ''
                  }`}>
                  <div className="space-y-1">
                    <p className="text-xs font-medium truncate">
                      {node.query}
                    </p>
                    <div className="flex items-center justify-between">
                      {node.discoveries !== undefined && (
                        <span className="text-[10px] text-muted-foreground">
                          {node.discoveries} found
                        </span>
                      )}
                      <Badge 
                        variant={
                          node.status === 'completed' ? 'default' :
                          node.status === 'in-progress' ? 'secondary' : 'outline'
                        }
                        className="text-[10px] py-0 px-1"
                      >
                        {node.status}
                      </Badge>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
        </div>
      ))}
    </div>
  );
}
