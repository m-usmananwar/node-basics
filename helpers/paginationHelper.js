const getPaginationData = (req) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const filters = req.query.filters || {};

    return {
        page,
        limit,
        filters
    };
}

const buildPaginatedResponse = ({ page, limit, total, data, filters = {} }) => {
    const totalPages = Math.ceil(total / limit);
    const hasNextPage = page < totalPages;
    const hasPrevPage = page > 1;
    const nextPage = hasNextPage ? page + 1 : null;
    const prevPage = hasPrevPage ? page - 1 : null;

    return {
        page,
        limit,
        filters,
        total,
        totalPages,
        hasNextPage,
        hasPrevPage,
        nextPage,
        prevPage,
        data,
    };
};

module.exports = { getPaginationData, buildPaginatedResponse };