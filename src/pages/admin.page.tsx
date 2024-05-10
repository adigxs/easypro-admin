import React from "react";
import classNames from "classnames";
import { useAuthContext } from "../core/context/auth-context";
import LayoutContent from "../layouts/layout-content";
import {
  CheckIcon,
  PeopleIcon,
  Profile2Icon,
  RefreshIcon,
  Send2Icon,
} from "../components/icons";
import Chart from "../components/admin/chart";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { BreadcrumbsMenu } from "../components";
import { useQuery } from "@tanstack/react-query";
import { visualizations } from "../core/api/api";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function AdminPage() {
  const { currentUser } = useAuthContext();

  const {
    data: visualizationData,
    isLoading: isLoadingVisualizations,
    error,
  } = useQuery({
    queryKey: ["all-visualizations"],
    queryFn: () => visualizations(),
  });
  console.log(visualizationData);
  return (
    <LayoutContent>
      <>
        <BreadcrumbsMenu
          label="EasyPro Admin"
          name="Dashboard"
          path="/dashboard/admin"
        />
        <div className="grid grid-cols-1 gap-4 m-4 sm:grid-cols-4 p-6">
          <div className="flex items-center bg-white border rounded-sm overflow-hidden shadow">
            <div className="p-4 bg-green-400">
              <Send2Icon className="h-12 w-12 text-white" />
            </div>
            <div className="px-4 text-gray-700">
              <h3 className="text-sm tracking-wider">Total Des Demandes</h3>
              <p className="text-3xl">768</p>
            </div>
          </div>

          <div className="flex items-center bg-white border rounded-sm overflow-hidden shadow">
            <div className="p-4 bg-red-400">
              <CheckIcon className="h-12 w-12 text-white" />
            </div>
            <div className="px-4 text-gray-700">
              <h3 className="text-sm tracking-wider">Demandes Reussies</h3>
              <p className="text-3xl">334</p>
            </div>
          </div>
          <div className="flex items-center bg-white border rounded-sm overflow-hidden shadow">
            <div className="p-4 bg-yellow-400">
              <RefreshIcon className="h-12 w-12 text-white" />
            </div>
            <div className="px-4 text-gray-700">
              <h3 className="text-sm tracking-wider">Demande en cours</h3>
              <p className="text-3xl">34</p>
            </div>
          </div>
          <div className="flex items-center bg-white border rounded-sm overflow-hidden shadow">
            <div className="p-4 bg-indigo-400">
              <PeopleIcon className="h-12 w-12 text-white" />
            </div>
            <div className="px-4 text-gray-700">
              <h3 className="text-sm tracking-wider">Total D'agents</h3>
              <p className="text-3xl">39</p>
            </div>
          </div>
        </div>
        <Chart />
      </>
    </LayoutContent>
  );
}
