import { Package2, Users, AlertTriangle, Calendar } from 'lucide-react'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface OverviewCardProps {
  title: string
  value: string | number
  description?: string
  icon?: React.ReactNode
}

function OverviewCard({ title, value, description, icon }: OverviewCardProps) {
  return (
    <Card className="bg-card text-card-foreground dark:bg-card-dark dark:text-card-dark-foreground">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {description && <p className="text-xs text-muted-foreground">{description}</p>}
      </CardContent>
    </Card>
  )
}

export function OverviewCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <OverviewCard
        title="Total Items"
        value="4,629"
        description="Across all branches"
        icon={<Package2 className="h-4 w-4 text-muted-foreground dark:text-muted-foreground-dark" />}
      />
      <OverviewCard
        title="Low Stock"
        value="6"
        description="Items need reordering"
        icon={<AlertTriangle className="h-4 w-4 text-destructive dark:text-destructive-dark" />}
      />
      <OverviewCard
        title="Expiring Soon"
        value="13"
        description="Within next 30 days"
        icon={<Calendar className="h-4 w-4 text-yellow-500 dark:text-yellow-400" />}
      />
      <OverviewCard
        title="Active Hospitals"
        value="45"
        description="Currently ordering"
        icon={<Users className="h-4 w-4 text-muted-foreground dark:text-muted-foreground-dark" />}
      />
    </div>
  )
}

