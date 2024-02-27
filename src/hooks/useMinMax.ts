import { useState, useEffect, useMemo, useCallback } from "react";

const useMinMax = (data: number[]) => {
  const [min, setMin] = useState(-1);
  const [max, setMax] = useState(-1);

  const memoizedMinMax = useMemo(() => {
    if (data && data.length > 0) {
      return [Math.min(...data), Math.max(...data)];
    }
    return [-1, -1];
  }, [data]);

  const updateMinMax = useCallback(() => {
    setMin(memoizedMinMax[0]!);
    setMax(memoizedMinMax[1]!);
  }, [memoizedMinMax]);

  useEffect(() => {
    updateMinMax();
  }, [updateMinMax]);

  return [min, max];
};

export default useMinMax;
