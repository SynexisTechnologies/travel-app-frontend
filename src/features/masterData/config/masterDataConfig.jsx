import { UnderDevelopment } from "@/shared/pages";
import {
  DestinationTabContent,
  ActivityTabContent,
  ServiceTabContent,
  EventTabContent,
  AccommodationTabContent,
  FindGuideTabContent,
} from "../tabs";

export const tabs = [
  {
    label: "Destination",
    id: "tab-0",
    ariaControls: "tabpanel-0",
    content: <DestinationTabContent />,
  },
  {
    label: "Service",
    id: "tab-1",
    ariaControls: "tabpanel-1",
    content: <ServiceTabContent />,
  },
  {
    label: "Activity",
    id: "tab-2",
    ariaControls: "tabpanel-2",
    content: <ActivityTabContent />,
  },
  {
    label: "Event",
    id: "tab-3",
    ariaControls: "tabpanel-3",
    content: <EventTabContent />,
  },
  {
    label: "Accommodation",
    id: "tab-4",
    ariaControls: "tabpanel-4",
    content: <AccommodationTabContent />,
  },
  {
    label: "Food",
    id: "tab-5",
    ariaControls: "tabpanel-5",
    content: <UnderDevelopment />,
  },
  {
    label: "Find Guide",
    id: "tab-6",
    ariaControls: "tabpanel-6",
    content: <FindGuideTabContent />,
  },
  {
    label: "User Subscription",
    id: "tab-7",
    ariaControls: "tabpanel-7",
    content: <UnderDevelopment />,
  },
  {
    label: "Hashtag",
    id: "tab-8",
    ariaControls: "tabpanel-8",
    content: <UnderDevelopment />,
  },
];
