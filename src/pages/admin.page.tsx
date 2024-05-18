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
import {
  renderAgentPerformances,
  renderFinancialReport,
  visualizations,
} from "../core/api/api";
import { isEmpty } from "lodash";
import {
  ArrowUpOnSquareIcon,
  DocumentCheckIcon,
  HandThumbUpIcon,
  InboxArrowDownIcon,
  PaperAirplaneIcon,
  XCircleIcon,
} from "@heroicons/react/20/solid";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function AdminPage() {
  const { data: visualizationData, isLoading: isLoadingVisualizations } =
    useQuery({
      queryKey: ["all-visualizations"],
      queryFn: () => visualizations(),
    });

  const {
    data: renderVisualizationData,
    isLoading: isLoadingRenderVisualizations,
  } = useQuery({
    queryKey: ["render-agents-performances"],
    queryFn: () => renderAgentPerformances(),
  });

  const {
    data: renderFinancialReportData,
    isLoading: isLoadingrenderFinancialReports,
  } = useQuery({
    queryKey: ["financial-report"],
    queryFn: () => renderFinancialReport(),
  });

  console.log(renderFinancialReportData);
  return (
    <LayoutContent>
      <>
        <BreadcrumbsMenu
          label="EasyPro Admin"
          name="Dashboard"
          path="/dashboard/admin"
        />
        <div className="grid grid-cols-1 gap-4 m-4 sm:grid-cols-4 p-6">
          {!isEmpty(visualizationData) ? (
            <>
              <div className="flex items-center bg-white border rounded-sm overflow-hidden shadow">
                <div className="p-4 bg-green-400">
                  <Send2Icon className="h-12 w-12 text-white" />
                </div>
                <div className="px-4 text-gray-700">
                  <h3 className="text-sm tracking-wider">Soumis</h3>
                  <p className="text-3xl">{visualizationData.STARTED.count} </p>
                </div>
              </div>
              <div className="flex items-center bg-white border rounded-sm overflow-hidden shadow">
                <div className="p-4 bg-red-400">
                  <CheckIcon className="h-12 w-12 text-white" />
                </div>
                <div className="px-4 text-gray-700">
                  <h3 className="text-sm tracking-wider">Payé</h3>
                  <p className="text-3xl">{visualizationData.STARTED.count} </p>
                </div>
              </div>

              <div className="flex items-center bg-white border rounded-sm overflow-hidden shadow">
                <div className="p-4 bg-yellow-400">
                  <RefreshIcon className="h-12 w-12 text-white" />
                </div>
                <div className="px-4 text-gray-700">
                  <h3 className="text-sm tracking-wider">Initié</h3>
                  <p className="text-3xl">
                    {visualizationData.COMMITTED.count}{" "}
                  </p>
                </div>
              </div>
              <div className="flex items-center bg-white border rounded-sm overflow-hidden shadow">
                <div className="p-4 bg-purple-400">
                  <ArrowUpOnSquareIcon className="h-12 w-12 text-white" />
                </div>
                <div className="px-4 text-gray-700">
                  <h3 className="text-sm tracking-wider">Rejeté</h3>
                  <p className="text-3xl">
                    {visualizationData.REJECTED.count}{" "}
                  </p>
                </div>
              </div>
              <div className="flex items-center bg-white border rounded-sm overflow-hidden shadow">
                <div className="p-4 bg-red-400">
                  <XCircleIcon className="h-12 w-12 text-white" />
                </div>
                <div className="px-4 text-gray-700">
                  <h3 className="text-sm tracking-wider">Erroné</h3>
                  <p className="text-3xl">
                    {visualizationData.INCORRECT.count}{" "}
                  </p>
                </div>
              </div>
              <div className="flex items-center bg-white border rounded-sm overflow-hidden shadow">
                <div className="p-4 bg-blue-400">
                  <DocumentCheckIcon className="h-12 w-12 text-white" />
                </div>
                <div className="px-4 text-gray-700">
                  <h3 className="text-sm tracking-wider">Établi</h3>
                  <p className="text-3xl">
                    {visualizationData.COMPLETED.count}{" "}
                  </p>
                </div>
              </div>
              <div className="flex items-center bg-white border rounded-sm overflow-hidden shadow">
                <div className="p-4 bg-brown-400">
                  <PaperAirplaneIcon className="h-12 w-12 text-white" />
                </div>
                <div className="px-4 text-gray-700">
                  <h3 className="text-sm tracking-wider">Expédié</h3>
                  <p className="text-3xl">{visualizationData.SHIPPED.count} </p>
                </div>
              </div>
              <div className="flex items-center bg-white border rounded-sm overflow-hidden shadow">
                <div className="p-4 bg-black">
                  <InboxArrowDownIcon className="h-12 w-12 text-white" />
                </div>
                <div className="px-4 text-gray-700">
                  <h3 className="text-sm tracking-wider">Réceptionné</h3>
                  <p className="text-3xl">
                    {visualizationData.RECEIVED.count}{" "}
                  </p>
                </div>
              </div>
              <div className="flex items-center bg-white border rounded-sm overflow-hidden shadow">
                <div className="p-4 bg-cyan-400">
                  <HandThumbUpIcon className="h-12 w-12 text-white" />
                </div>
                <div className="px-4 text-gray-700">
                  <h3 className="text-sm tracking-wider">Livré</h3>
                  <p className="text-3xl">
                    {visualizationData.DELIVERED.count}{" "}
                  </p>
                </div>
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
        <Chart />
      </>
    </LayoutContent>
  );
}
