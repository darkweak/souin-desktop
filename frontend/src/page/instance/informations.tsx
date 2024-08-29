import { Instance } from "@/components/form";
import { InstancesKind } from "@/context";
import { Instance as InstanceType } from "@/types";
import React from "react";

export const Informations: React.FC<{instance: InstanceType}> = ({ instance }) => {
    return <Instance defaultValues={instance} type={InstancesKind.UPDATE} />
}