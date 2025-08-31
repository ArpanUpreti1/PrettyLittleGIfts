import React, { useState, useEffect, useLayoutEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Map of id -> DOM element
  const cardRefs = useRef({});
  const prevCountRef = useRef(0);
  const didMountRef = useRef(false);

  const setCardRef = (id) => (el) => {
    if (el) {
      cardRefs.current[id] = el;
    } else {
      delete cardRefs.current[id];
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5028/api/Products", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (!response.ok) throw new Error("Failed to fetch products");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Entry animation — only on initial load or when items are added
  useLayoutEffect(() => {
    const currentCount = products.length;
    const prevCount = prevCountRef.current;

    if (!didMountRef.current) {
      didMountRef.current = true;
    }

    const shouldAnimateIn = currentCount > 0 && (prevCount === 0 || currentCount > prevCount);

    if (shouldAnimateIn) {
      const cards = Object.values(cardRefs.current);
      gsap.from(cards, {
        opacity: 0,
        y: 24,
        scale: 0.98,
        duration: 0.6,
        ease: "power3.out",
        stagger: 0.08,
        clearProps: "opacity,transform",
      });
    }

    prevCountRef.current = currentCount;
  }, [products.length]);

  // Hover interactions with GSAP
  useLayoutEffect(() => {
    const cards = Object.values(cardRefs.current);
    const enterHandlers = new Map();
    const leaveHandlers = new Map();

    cards.forEach((card) => {
      const onEnter = () =>
        gsap.to(card, { y: -6, scale: 1.02, duration: 0.18, ease: "power3.out" });
      const onLeave = () =>
        gsap.to(card, { y: 0, scale: 1, duration: 0.22, ease: "power3.out" });

      card.addEventListener("mouseenter", onEnter);
      card.addEventListener("mouseleave", onLeave);
      enterHandlers.set(card, onEnter);
      leaveHandlers.set(card, onLeave);
    });

    return () => {
      cards.forEach((card) => {
        card.removeEventListener("mouseenter", enterHandlers.get(card));
        card.removeEventListener("mouseleave", leaveHandlers.get(card));
      });
    };
  }, [products]);

  const animateOutAndRemove = async (id) => {
    const el = cardRefs.current[id];
    if (!el) {
      setProducts((prev) => prev.filter((p) => p.id !== id));
      return;
    }

    await new Promise((resolve) => {
      gsap.to(el, {
        opacity: 0,
        y: 20,
        scale: 0.96,
        duration: 0.25,
        ease: "power2.in",
        onComplete: resolve,
      });
    });

    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5028/api/Products/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) throw new Error("Failed to delete product");
      await animateOutAndRemove(id);
    } catch (error) {
      console.error(error);
    }
  };

  const formatPrice = (n) =>
    `Rs. ${new Intl.NumberFormat("en-NP", { maximumFractionDigits: 0 }).format(n ?? 0)}`;

  return (
    <div className="container mx-auto px-6 py-10">
      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">All Products</h2>
          <p className="text-sm text-gray-500 mt-1">
            {loading ? "Loading…" : `${products.length} item${products.length === 1 ? "" : "s"}`}
          </p>
        </div>
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-2 rounded-xl bg-gray-900 text-white px-5 py-2.5 shadow-sm transition-colors hover:bg-black"
        >
          <span>Back to Dashboard</span>
        </Link>
      </div>

      {/* Empty state */}
      {!loading && products.length === 0 && (
        <div className="text-center text-gray-500 text-lg py-16">No products available.</div>
      )}

      {/* Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {/* Skeletons while loading */}
        {loading &&
          Array.from({ length: 8 }).map((_, i) => (
            <div key={`skeleton-${i}`} className="rounded-2xl bg-white shadow-md overflow-hidden">
              <div className="h-48 w-full bg-gray-200 animate-pulse" />
              <div className="p-5 space-y-3">
                <div className="h-5 bg-gray-200 rounded w-3/4 animate-pulse" />
                <div className="h-4 bg-gray-200 rounded w-full animate-pulse" />
                <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse" />
                <div className="flex items-center justify-between pt-2">
                  <div className="h-6 bg-gray-200 rounded w-20 animate-pulse" />
                  <div className="h-6 bg-gray-200 rounded w-10 animate-pulse" />
                </div>
                <div className="flex gap-3 pt-2">
                  <div className="h-10 bg-gray-200 rounded-lg flex-1 animate-pulse" />
                  <div className="h-10 bg-gray-200 rounded-lg flex-1 animate-pulse" />
                </div>
              </div>
            </div>
          ))}

        {!loading &&
          products.map((product, index) => (
            <div
              key={product.id}
              ref={setCardRef(product.id)}
              className="bg-white rounded-2xl shadow-md overflow-hidden will-change-transform"
            >
              {/* Image */}
              <div className="w-full h-48 bg-gray-100 overflow-hidden">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
                  <span className="text-xs text-gray-400">#{index + 1}</span>
                </div>

                <p className="mt-2 text-sm text-gray-600 line-clamp-2">{product.description}</p>

                <div className="mt-4 flex items-center justify-between">
                  <span className="text-lg font-bold text-gray-900">{formatPrice(product.price)}</span>
                </div>

                <div className="mt-5 flex gap-3">
                  <Link
                    to={`/edit-product/${product.id}`}
                    className="flex-1 text-center rounded-lg bg-gray-900 text-white py-2.5 transition-colors hover:bg-black"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="flex-1 rounded-lg bg-red-500 text-white py-2.5 transition-colors hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ProductList;
