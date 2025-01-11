import React, { FC, useRef } from "react";
import {
  Masterscholarship,
  Scholarship,
  ScholarshipStatus,
  UpdateMasterscholarshipMutation,
  UpdateScholarshipMutation,
} from "../../src/API";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import Image from "next/image";
import glasses from "../../public/svg/glasses.svg";
import check from "../../public/svg/check.svg";
import { useAuth } from "../../hooks/use-auth";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getMasterScholarships,
  getStudentScholarships,
} from "../../src/CustomAPI";
import { Skeleton } from "../Skeleton";
import { API } from "aws-amplify";
import {
  updateMasterscholarship,
  updateScholarship,
} from "../../src/graphql/mutations";
import { GraphQLResult } from "@aws-amplify/api-graphql";
import toast from "react-hot-toast";
import { cn } from "../../src/lib/utils";

type TMyScholarships = {
  // scholarships: Scholarship[];
};

export const MyMastersScholarships: FC<TMyScholarships> = () => {
  const { locale } = useRouter();
  const { t } = useTranslation("scholarships");
  const { cpr } = useAuth();
  const queryClient = useQueryClient();

  // const cpr = user?.getSignInUserSession()?.getAccessToken().payload.username;

  const declineDialog = useRef<HTMLDialogElement>(null);

  const { data: scholarships, isPending: isScholarshipsPending } = useQuery<
    Masterscholarship[]
  >({
    queryKey: ["masterScholarships", cpr],
    queryFn: () => (cpr ? getMasterScholarships({ studentCPR: cpr }) : []),
  });

  console.log(scholarships);

  const updateMasterScholarshipStatus = async ({
    id,
    status,
    _version,
  }: {
    id: string;
    status: ScholarshipStatus;
    _version: number;
  }) => {
    const updatedMasterScholarship = (await API.graphql({
      query: updateMasterscholarship,
      variables: {
        input: {
          id,
          status,
          _version,
        },
      },
    })) as GraphQLResult<UpdateMasterscholarshipMutation>;
    return updatedMasterScholarship;
  };

  const updateMasterScholarshipMutation = useMutation({
    mutationFn: (values: {
      id: string;
      status: ScholarshipStatus;
      _version: number;
    }) => {
      return updateMasterScholarshipStatus(values);
    },
    async onSuccess(data) {
      if (data.data?.updateMasterscholarship) {
        queryClient.invalidateQueries({
          queryKey: [
            "masterScholarships",
            data.data.updateMasterscholarship.studentCPR,
          ],
        });
      } else {
      }
    },
    async onError(error) {
      toast.error(error.message, { duration: 6000 });
    },
  });
  const declineMasterScholarshipMutation = useMutation({
    mutationFn: (values: { id: string; _version: number }) => {
      return updateMasterScholarshipStatus({
        ...values,
        status: ScholarshipStatus.WITHDRAWN,
      });
    },
    async onSuccess(data) {
      if (data.data?.updateMasterscholarship) {
        queryClient.invalidateQueries({
          queryKey: [
            "masterScholarships",
            data.data?.updateMasterscholarship.studentCPR,
          ],
        });
      } else {
      }
    },
    async onError(error) {
      toast.error(error.message, { duration: 6000 });
    },
  });
  const approveScholarshipMutation = useMutation({
    mutationFn: (values: {
      id: string;

      _version: number;
    }) => {
      return updateMasterScholarshipStatus({
        ...values,
        status: ScholarshipStatus.APPROVED,
      });
    },
    async onSuccess(data) {
      if (data.data?.updateMasterscholarship) {
        queryClient.invalidateQueries({
          queryKey: [
            "masterScholarships",
            data.data?.updateMasterscholarship.studentCPR,
          ],
        });
      } else {
      }
    },
    async onError(error) {
      toast.error(error.message, { duration: 6000 });
    },
  });

  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3 [grid-auto-rows:1fr]">
      {isScholarshipsPending && (
        <>
          <Skeleton className="w-full h-64 rounded-md bg-slate-200" />
        </>
      )}

      {(!scholarships || scholarships.length === 0) &&
        !isScholarshipsPending && (
          <div className="p-6 rounded-md border">
            {/* No Approved Applications */}
            <p>{t("noApprovedApplications")}</p>
          </div>
        )}

      {scholarships &&
        !isScholarshipsPending &&
        scholarships.map((scholarship, i) => {
          const contractStatus = Boolean(scholarship.signedContractDoc);
          const bankDetailsStatus = Boolean(
            scholarship.bankName &&
              scholarship.IBAN &&
              scholarship.IBANLetterDoc
          );

          return (
            <div key={i}>
              <div className="relative duration-200">
                <div
                  className={cn(
                    `pt-6 shadow card bg-warning`,
                    scholarship.isConfirmed && "bg-success"
                  )}
                >
                  <div className="p-4 bg-white min-h-[15rem] pt-10 card gap-4 flex flex-col justify-between">
                    {/* Status */}
                    <div className="flex flex-wrap justify-between items-baseline">
                      <h3
                        onClick={() =>
                          updateMasterScholarshipMutation.mutate({
                            id: scholarship.id,
                            _version: scholarship._version,
                            status: ScholarshipStatus.PENDING,
                          })
                        }
                        className="text-xl font-semibold"
                      >
                        {t(
                          `${
                            scholarship.isConfirmed
                              ? t("confirmed")
                              : scholarship.status ===
                                ScholarshipStatus.APPROVED
                              ? t("accepted")
                              : scholarship.status
                          }`
                        )}
                      </h3>
                      {/* Submit Date */}
                      <div className="inline-flex gap-1 stat-desc">
                        <p>{t("submitDate")}</p>
                        <p>
                          {Intl.DateTimeFormat(locale).format(
                            new Date(scholarship.createdAt)
                          )}
                        </p>
                      </div>
                    </div>

                    {scholarship.status &&
                      [
                        ScholarshipStatus.PENDING,
                        ScholarshipStatus.WITHDRAWN,
                        ScholarshipStatus.REJECTED,
                      ].includes(scholarship.status) && (
                        <div className="flex flex-col justify-between grow">
                          <div className="flex flex-col gap-3">
                            <div>
                              {/* Selected University */}
                              <div className="flex gap-1 text-sm flex-cpl stat-title">
                                {t("university")}
                              </div>
                              {locale === "ar"
                                ? scholarship.application?.university
                                    ?.universityNameAr
                                : scholarship.application?.university
                                    ?.universityName}
                            </div>
                            <div>
                              {/* Selected Program */}
                              <div className="flex gap-1 text-sm flex-cpl stat-title">
                                {t("major")}
                              </div>
                              {scholarship.application?.major
                                ? t(scholarship.application?.major)
                                : "Not available"}
                            </div>
                            <div>
                              {/* Selected Program */}
                              <div className="flex gap-1 text-sm flex-cpl stat-title">
                                {t("selectedProgram")}
                              </div>
                              {scholarship.application?.program}
                            </div>
                          </div>
                          {scholarship.status === ScholarshipStatus.PENDING && (
                            <div className="flex gap-3 justify-end">
                              <button
                                type="button"
                                disabled={
                                  declineMasterScholarshipMutation.isPending ||
                                  approveScholarshipMutation.isPending
                                }
                                onClick={() =>
                                  // declineScholarshipMutation.mutate({
                                  //   id: scholarship.id,
                                  //   _version: scholarship._version,
                                  // })
                                  {
                                    declineDialog.current?.showModal();
                                  }
                                }
                                className={cn("btn btn-ghost")}
                              >
                                {declineMasterScholarshipMutation.isPending && (
                                  <span className="loading"></span>
                                )}{" "}
                                {t("decline")}
                              </button>
                              <dialog
                                ref={declineDialog}
                                id="decline_modal"
                                className="modal"
                              >
                                <div className="modal-box">
                                  <form method="dialog">
                                    <button className="absolute top-2 right-2 btn btn-sm btn-circle btn-ghost">
                                      ✕
                                    </button>
                                  </form>
                                  <h3 className="text-lg font-bold">
                                    {t("youWantToDecline")}
                                    {/* Are you sure you want to decline this
                                    scholarship? */}
                                  </h3>
                                  <div className="flex flex-col gap-2 pt-2 pb-4">
                                    <p className="stat-desc">
                                      {t("cannotBeUndone")}
                                      {/* This action cannot be undone. */}
                                    </p>
                                  </div>
                                  <form
                                    method="dialog"
                                    className="flex gap-3 justify-center items-center"
                                  >
                                    <button
                                      // type="button"
                                      disabled={
                                        declineMasterScholarshipMutation.isPending ||
                                        approveScholarshipMutation.isPending
                                      }
                                      onClick={() =>
                                        declineMasterScholarshipMutation.mutate(
                                          {
                                            id: scholarship.id,
                                            _version: scholarship._version,
                                          }
                                        )
                                      }
                                      className={cn("btn btn-primary")}
                                    >
                                      {declineMasterScholarshipMutation.isPending && (
                                        <span className="loading"></span>
                                      )}
                                      {t("decline")}
                                    </button>
                                    <button className="btn btn-ghost bg-stone-200">
                                      {t("close")}
                                    </button>
                                  </form>
                                </div>
                              </dialog>
                              <button
                                type="button"
                                disabled={
                                  approveScholarshipMutation.isPending ||
                                  declineMasterScholarshipMutation.isPending
                                }
                                onClick={() =>
                                  approveScholarshipMutation.mutate({
                                    id: scholarship.id,
                                    _version: scholarship._version,
                                  })
                                }
                                className={cn("btn btn-warning")}
                              >
                                {approveScholarshipMutation.isPending && (
                                  <span className="loading"></span>
                                )}{" "}
                                {t("accept")}
                              </button>
                            </div>
                          )}
                        </div>
                      )}

                    {scholarship.status === ScholarshipStatus.APPROVED && (
                      <div className="flex flex-col gap-3 justify-between grow">
                        <div className="flex flex-col gap-2">
                          {/* Complete the next steps to confirm your scholarship. */}
                          {!contractStatus && !bankDetailsStatus && (
                            <p className="text-sm">{t("completeNextSteps")}</p>
                          )}
                          <div className="flex justify-between items-baseline">
                            <p className="font-medium">{t("contractStatus")}</p>
                            <div>
                              {contractStatus ? (
                                <p>{t("completed")}</p>
                              ) : (
                                <p className="text-error">{t("pending")}</p>
                              )}
                            </div>
                          </div>
                          <div className="flex justify-between items-baseline">
                            <p className="font-medium">
                              {t("bankDetailsStatus")}
                            </p>
                            {bankDetailsStatus ? (
                              <p>{t("completed")}</p>
                            ) : (
                              <p className="text-error">{t("pending")}</p>
                            )}
                          </div>
                        </div>
                        <div className="flex gap-3 justify-end">
                          {/* Complete/View Application */}
                          <Link
                            href={`/masters/scholarship/${scholarship.id}`}
                            className={cn(
                              "text-white btn btn-secondary",
                              scholarship.isConfirmed && "btn-success"
                            )}
                          >
                            {contractStatus && bankDetailsStatus
                              ? t("view")
                              : t("completeApplication")}
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div
                  className={cn(
                    `absolute flex items-center justify-center w-12 h-12 border-2 border-white rounded-full top-2 left-2 bg-warning`,
                    scholarship.isConfirmed && "bg-success"
                  )}
                >
                  <Image
                    className="object-contain w-5 aspect-square"
                    src={scholarship.isConfirmed ? check : glasses}
                    alt="icon"
                  ></Image>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};
