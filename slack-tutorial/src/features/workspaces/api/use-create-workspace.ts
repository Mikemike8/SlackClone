import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useCallback, useMemo, useState } from "react";
import { Doc, Id } from "../../../../convex/_generated/dataModel";

type RequestType = { name: string  } ;
type ResponseType = Id<"workspaces"> | null;

type Options = {
  onSuccess?: (data: ResponseType) => void;
  onError?: (error: Error) => void;
  onSettled?: () => void;
  throwOnError?: boolean;
};

export const useCreateWorkspace = (options?: Options) => {
  const [data, setData] = useState<ResponseType >(null);
  const [error, setError] = useState<Error | null>(null);
  const [state, setState] = useState<"success" | "pending" | "success" | "error" | null >(null);

//   const [ isPending, setIsPending] = useState(false);
//   const [ isSuccess, setIsSuccess] = useState(false);
//   const [ isError, setIsError] = useState(false);
//   const [ isSettled, setIsSettled] = useState(false);

const [status, setStatus] = useState<"settled" |"pending" | "success" | "error" | null>(null);

const isPending = useMemo(() => status === "pending", [status]);
const isSuccess = useMemo(() => status === "success", [status]);
const isError = useMemo(() => status === "error", [status]);
const isSettled = useMemo(() => status === "success" || status === "error", [status]);


  const mutation = useMutation(api.workspaces.create);

  const mutate = useCallback(
    async (values: RequestType, opts?: Options) => {
      try {

        setData(null);
        setError(null);
        setStatus("pending");
      
        const response= await mutation(values);
        opts?.onSuccess?.(response);
        return response;
      } catch (error: any) {
        opts?.onError?.(error as Error);
        if (opts?.throwOnError){
            throw error;
        }
    
      } finally {
        setStatus("settled");
        opts?.onSettled?.();

      
      }
    },
    [mutation]
  );

  return { mutate, data, error, isPending, isSuccess, isError, isSettled };
};
