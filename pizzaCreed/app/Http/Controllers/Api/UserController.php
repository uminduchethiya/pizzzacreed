<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreUsersRequest;
use App\Http\Requests\UpdateUsersRequest;
use App\Http\Resources\UserResource;
use App\Models\User;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return UserResource::collection(User::query()->orderBy("id","desc")->paginate(10));
    }

    /**
     * Store a newly created resource in storage.
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */

    public function store(StoreUsersRequest $request)
    {
        $data=$request->validated();
        $data['password']= bcrypt($data['password']);
        $user=User::create($data);
        return response(new UserResource($user),201);
    }

    /**
     * Display the specified resource.
     */
    public function show(User $users)
    {
        return new UserResource($users);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUsersRequest $request, User $users)
    {
        $data=$request->validated();
        if(isset($data['password'])){
            $data['password']= bcrypt($data['password']);
        }
        $users->update($data);
        return new UserResource($users);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $users)
    {
        $users->delete();
        return response("",204);
    }
}
