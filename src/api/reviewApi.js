import api from "./axios";

export async function getReviews(params = {}) {
  const { data } = await api.get("/admin/reviews", { params });
  return data;
}

export async function setReviewApproved(reviewId, approved) {
  const { data } = await api.post(`/reviews/${reviewId}/approve`, null, {
    params: approved ? {} : { approved: false },
  });
  return data;
}

export async function deleteReview(reviewId) {
  await api.delete(`/reviews/${reviewId}`);
  return true;
}

export async function getProductReviews(productId, params = {}) {
  const { data } = await api.get(`/reviews/product/${productId}`, { params });
  return data;
}
