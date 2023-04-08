<?php

namespace Jkli\Cms\Http\Controller;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;
use Jkli\Cms\Actions\CreatePageAcion;
use Jkli\Cms\Actions\Node\CreateNodeAction;
use Jkli\Cms\Http\Controller\Controller;
use Jkli\Cms\Http\Resources\NodeResource;

class NodeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Jkli\Cms\Actions\Node\CreateNodeAction  $action
     * @return \Illuminate\Http\Response
     */
    public function store(CreateNodeAction $action)
    {
        $node = $action->handle();
        $path = ltrim($node->rootAncestor->page->full_path, "/");
        Session::put("lcms.created_node", NodeResource::make($node));
        return Redirect::route("page.show", ["path" => $path]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show()
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
