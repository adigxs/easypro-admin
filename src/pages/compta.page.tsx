import { useQuery } from "@tanstack/react-query";
import { BreadcrumbsMenu } from "../components";
import LayoutContent from "../layouts/layout-content";
import { renderFinancialReport } from "../core/api/api";
import { useEffect, useMemo, useState } from "react";
import classNames from "classnames";
import { PaymentData } from "../core/entities/request.entities";
import { isEmpty } from "lodash";
import { Input } from "@material-tailwind/react";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";

export default function ComptaPage() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const {
    data: renderFinancialReportData,
    isLoading: isLoadingrenderFinancialReports,
  } = useQuery<PaymentData[]>({
    queryKey: ["financial-report"],
    queryFn: () => renderFinancialReport(),
  });

  const searchData = useMemo(() => {
    if (isEmpty(searchQuery)) {
      return renderFinancialReportData;
    }

    return renderFinancialReportData!.filter((item) => {
      return item.date!.toLowerCase().includes(searchQuery.toLowerCase());
    });
  }, [renderFinancialReportData, searchQuery]);

  return (
    <LayoutContent>
      <BreadcrumbsMenu
        label="EasyPro Admin"
        name="Comptabilité"
        path="/dashboard/compta"
      />
      <div>
        <div className="flex items-end justify-end pb-4 px-4">
          <div className="w-full md:w-72">
            <Input
              label="Rechercher par date..."
              crossOrigin={""}
              icon={<MagnifyingGlassIcon className="h-5 w-5" />}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-col divide-y divide-dashed">
          {!isEmpty(searchData) ? (
            searchData
              ?.sort((a, b) => b.date.localeCompare(a.date))
              .map((item, i) => {
                return (
                  <div className="bg-white px-5 pb-4">
                    <div className="flex flex-row w-full justify-between">
                      <h3 className="text-base font-normal leading-6 text-sub-heading mt-2">
                        Rapport financier du{" : "}
                        <span className="text-xl"> {item.date}</span>
                      </h3>
                      <h3 className="text-xl font-normal leading-6 text-sub-heading mt-2">
                        Montant Total{" : "}
                        <span className="text-xl">
                          {" "}
                          {item.total_amount} FCFA
                        </span>
                      </h3>
                    </div>
                    <dl className="mt-5 grid grid-cols-1 divide-y divide-gray-200 overflow-hidden md:grid-cols-5 md:divide-x md:divide-y-0">
                      <div className="sm:p-6 flex flex-col gap-4 items-start">
                        <dt className={classNames("text-base font-medium")}>
                          Paiements
                        </dt>
                        <dd className="mt-1 flex items-baseline w-full justify-between md:block lg:flex">
                          <div className="flex flex-col justify-start gap-4">
                            <span className="text-lg font-light text-sub-heading">
                              MTN MOMO
                            </span>

                            <span className="text-lg font-light text-sub-heading">
                              Orange Money
                            </span>
                          </div>
                          <div className="flex flex-col justify-start gap-4">
                            <span className="text-lg font-semibold text-sub-heading">
                              {item["mtn-momo"].total_amount} FCFA
                            </span>
                            <span className="text-lg font-semibold text-sub-heading">
                              {item["orange-money"].total_amount} FCFA
                            </span>
                          </div>
                        </dd>
                      </div>

                      <div className="sm:p-6 flex flex-col gap-4 items-start">
                        <dt className={classNames("text-base font-medium")}>
                          regions
                        </dt>
                        {item.regions.map((element, i) => {
                          if (element.total_amount !== 0) {
                            return (
                              <dd className="mt-1 flex items-baseline w-full justify-between md:block lg:flex">
                                <div className="flex flex-col justify-start gap-4">
                                  <span className="text-base font-semibold text-sub-heading">
                                    {element.name}
                                  </span>
                                </div>
                                <div className="flex flex-col justify-start gap-4">
                                  <span className="text-base font-semibold text-sub-heading">
                                    {item.total_amount} FCFA
                                  </span>
                                </div>
                              </dd>
                            );
                          }
                        })}
                      </div>

                      <div className="sm:p-6 flex flex-col gap-4 items-start">
                        <dt className={classNames("text-base font-medium")}>
                          Tribunal
                        </dt>
                        {item.courts.map((element, i) => {
                          if (element.total_amount !== 0) {
                            return (
                              <dd className="mt-1 flex items-baseline w-full justify-between md:block lg:flex">
                                <div className="flex flex-col justify-start gap-4">
                                  <span className="text-base font-semibold text-sub-heading">
                                    {element.name}
                                  </span>
                                </div>
                                <div className="flex flex-col justify-start gap-4">
                                  <span className="text-base font-semibold text-sub-heading">
                                    {item.total_amount} FCFA
                                  </span>
                                </div>
                              </dd>
                            );
                          }
                        })}
                      </div>

                      <div className="sm:p-6 flex flex-col gap-4 items-start">
                        <dt className={classNames("text-base font-medium")}>
                          Agents
                        </dt>
                        {item.agents.map((element, i) => {
                          if (element.total_amount !== 0) {
                            return (
                              <dd className="mt-1 flex items-baseline w-full justify-between md:block lg:flex">
                                <div className="flex flex-col justify-start gap-4">
                                  <span className="text-base font-semibold text-sub-heading">
                                    {element.name}
                                  </span>
                                </div>
                                <div className="flex flex-col justify-start gap-4">
                                  <span className="text-base font-semibold text-sub-heading">
                                    {item.total_amount} FCFA
                                  </span>
                                </div>
                              </dd>
                            );
                          }
                        })}
                      </div>

                      <div className="sm:p-6 flex flex-col gap-4 items-start">
                        <dt className={classNames("text-base font-medium")}>
                          Entreprises
                        </dt>
                        {item.companies.map((element, i) => {
                          if (element.total_amount !== 0) {
                            return (
                              <dd className="mt-1 flex items-baseline w-full justify-between md:block lg:flex">
                                <div className="flex flex-col justify-start gap-4">
                                  <span className="text-base font-semibold text-sub-heading">
                                    {element.name}
                                  </span>
                                </div>
                                <div className="flex flex-col justify-start gap-4">
                                  <span className="text-base font-semibold text-sub-heading">
                                    {item.total_amount} FCFA
                                  </span>
                                </div>
                              </dd>
                            );
                          }
                        })}
                      </div>
                    </dl>
                  </div>
                );
              })
          ) : (
            <></>
          )}
        </div>
      </div>
    </LayoutContent>
  );
}
