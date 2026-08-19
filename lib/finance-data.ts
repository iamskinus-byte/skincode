export type MoneyMetric = {
  label: string;
  value: string;
  delta: string;
  tone: "positive" | "warning" | "neutral";
};

export type Insight = {
  title: string;
  detail: string;
  impact: string;
};

export type Integration = {
  name: string;
  category: string;
  status: "Live" | "Syncing" | "Review";
};

export type Transaction = {
  merchant: string;
  account: string;
  amount: string;
  type: "Business" | "Personal";
  signal: string;
};

export const moneyMetrics: MoneyMetric[] = [
  {
    label: "Unified balance",
    value: "$1.28M",
    delta: "+12.8% across linked entities",
    tone: "positive",
  },
  {
    label: "Runway forecast",
    value: "18.4 mo",
    delta: "3.2 mo gained after spend controls",
    tone: "positive",
  },
  {
    label: "Personal net worth",
    value: "$842K",
    delta: "+$24K from brokerage performance",
    tone: "positive",
  },
  {
    label: "Cash risk watch",
    value: "$74K",
    delta: "Invoices likely to slip past terms",
    tone: "warning",
  },
];

export const aiInsights: Insight[] = [
  {
    title: "Renegotiate card processing before month end",
    detail:
      "AI found interchange fees running 18% above peers after Stripe, Shopify, and bank feeds were reconciled.",
    impact: "Projected annual savings: $31,400",
  },
  {
    title: "Move idle operating cash into a ladder",
    detail:
      "Payroll, tax, and AP timing leaves $210K idle for 41 days with low probability of drawdown.",
    impact: "Estimated yield lift: $8,900",
  },
  {
    title: "Separate founder expenses automatically",
    detail:
      "Twelve recurring vendors look mixed-use; Kira can split by calendar, receipt, and entity policy.",
    impact: "Book close risk reduced by 27%",
  },
];

export const integrations: Integration[] = [
  { name: "Chase Business", category: "Banking", status: "Live" },
  { name: "American Express", category: "Cards", status: "Live" },
  { name: "QuickBooks", category: "Accounting", status: "Syncing" },
  { name: "Stripe", category: "Revenue", status: "Live" },
  { name: "Plaid Investments", category: "Personal wealth", status: "Review" },
  { name: "Ramp Policies", category: "Spend controls", status: "Live" },
];

export const transactions: Transaction[] = [
  {
    merchant: "AWS Marketplace",
    account: "Operating card",
    amount: "-$12,480",
    type: "Business",
    signal: "Budget drift +8%",
  },
  {
    merchant: "Vanguard ETF Sweep",
    account: "Personal brokerage",
    amount: "+$18,300",
    type: "Personal",
    signal: "Rebalanced",
  },
  {
    merchant: "Northstar Payroll",
    account: "Payroll checking",
    amount: "-$86,240",
    type: "Business",
    signal: "On schedule",
  },
  {
    merchant: "Founders Dinner",
    account: "Amex Platinum",
    amount: "-$624",
    type: "Business",
    signal: "Receipt needed",
  },
];

export const forecastBars = [
  { month: "Aug", value: 72 },
  { month: "Sep", value: 84 },
  { month: "Oct", value: 63 },
  { month: "Nov", value: 91 },
  { month: "Dec", value: 78 },
  { month: "Jan", value: 96 },
];
