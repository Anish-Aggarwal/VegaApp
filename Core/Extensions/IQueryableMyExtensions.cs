using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using VegaApp.Core.Models;

namespace VegaApp.Core.Extensions
{
    public static class IQueryableMyExtensions
    {
        public static IQueryable<T> ApplyOrdering<T>(this IQueryable<T> query,
        IQuery filter,
        Dictionary<string, Expression<Func<T, object>>> dictMap)
        {
            if (String.IsNullOrEmpty(filter.SortBy) || !dictMap.ContainsKey(filter.SortBy))
            {
                return query;
            }
            return query = filter.IsSortAscending ?
            query.OrderBy(dictMap[filter.SortBy]) :
            query.OrderByDescending(dictMap[filter.SortBy]);
        }

        public static IQueryable<T> ApplyPaging<T>(this IQueryable<T> query, IQuery queryObj)
        {
            if (queryObj.PageSize <= 0)
            {
                queryObj.PageSize = 10;
            }
            if (queryObj.Page <= 0)
            {
                queryObj.Page = 1;
            }

            return query.Skip((queryObj.Page - 1)*queryObj.PageSize).Take(queryObj.PageSize);
        }
    }
}