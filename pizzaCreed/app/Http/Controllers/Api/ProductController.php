<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreproductRequest;
use App\Http\Requests\UpdateproductRequest;
use App\Http\Resources\ProductResource;
use App\Models\product;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function index()
    {
        return ProductResource::collection(product::query()->orderBy('id', 'desc')->paginate());
    }

    /**
     * Store a newly created resource in storage.
     * @return \Illuminate\Http\Response
     */
    public function store(StoreproductRequest $request)
    {
        $data = $request->validated();
        $data['password'] = bcrypt($data['password']);
        $product = product::create($data);

        return response(new ProductResource($product) , 201);
    }

    /**
     * Display the specified resource.
     * @param \App\Models\product $product
     * @return \Illuminate\Http\Response
     */
    public function show(product $product)

    {
        return new ProductResource($product);
    }

    /**
     * Update the specified resource in storage.
     *  @param \App\Http\Requests\UpdateproductRequest $request
     * @param \App\Models\product                    $product
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateproductRequest $request, product $product)
    {
        $data = $request->validated();
        if (isset($data['password'])) {
            $data['password'] = bcrypt($data['password']);
        }
        $product->update($data);

        return new UserResource($product);
    }

    /**
     * Remove the specified resource from storage.
     * @param \App\Models\product $product
     * @return \Illuminate\Http\Response
     */
    public function destroy(product $product)
    {
        $product->delete();

        return response("", 204);
    }
}
